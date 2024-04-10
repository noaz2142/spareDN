using DAL;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using DAL.DbModels;
using Microsoft.AspNetCore.Http;
using DAL.DtoModels;

namespace BL
{
    public class PartBL
    {
        public bool SaveNewPart(DAL.DtoModels.PartDTO p)
        {
            try
            {

                // saving image
                PartsDal d = new PartsDal();
                d.Insert(p.FromPartDTO());
                return true;
            }
            catch
            {
                return false;
            }

        }

        // להסתיר למשתמש חדש מוצרים שנוספו ביומים האחרונים
        private IEnumerable<DAL.DbModels.PartForDevice> GetPartsByCreationDate(int userId)
        {
            DAL.PartsDal partDal = new();
            List<DAL.DbModels.PartForDevice> partList = partDal.GetAll().ToList();
            DAL.DbModels.PartForDevice partList2 = partList.FirstOrDefault(x => x.ContactId == userId);
            bool isNewUser = partList.FirstOrDefault(x => x.ContactId == userId) == null;
            if (!isNewUser)
            {
                return partList;
            }
            return partList.Where(p => p.CreationDate?.Date == null || p.CreationDate?.Date < DateTime.Today.Date.AddDays(-2));
        }

        public IEnumerable<DAL.DbModels.PartForDevice> GetUserParts(int userId)
        {
            DAL.PartsDal partDal = new();
            List<DAL.DbModels.PartForDevice> partList = partDal.GetAll().ToList();
            DAL.DbModels.PartForDevice partList2 = partList.FirstOrDefault(x => x.ContactId == userId);
            return partList.Where(x => x.ContactId == userId);
        }

        public IEnumerable<DAL.DbModels.PartForDevice> GetParts(bool getRemoved = false)
        {

            return new DAL.PartsDal().GetAll(getRemoved);
        }

        public IEnumerable<DAL.DbModels.Category> GetCategoryList()
        {
            return new DAL.PartsDal().GetAllCategory();
        }

        public IEnumerable<DAL.DbModels.PartForDevice> GetPartsByName(string nameToSearch, int categoryId, int userId)
        {
            if (categoryId != -1)
            {
                return GetPartsByCategory(categoryId, userId).Where(x => x.PartName.Contains(nameToSearch, StringComparison.OrdinalIgnoreCase));
            }
            return GetPartsByCreationDate(userId).Where(x => x.PartName.Contains(nameToSearch, StringComparison.OrdinalIgnoreCase));
        }

        public IEnumerable<DAL.DbModels.PartForDevice> GetPartsByCity(string city, string state = "Israel", int categoryId = -1, int userId = -1)
        {
            return GetPartsByCategory(categoryId, userId).Where(x => x.Contact.City.Contains(city, StringComparison.OrdinalIgnoreCase));
        }

        public bool SaveFile(IFormFile value)
        {
            if (value == null || value.Length == 0)
                return false;

            // Set the path where you want to save the file on the server
            string filePath = Path.Combine("../Uploads", value.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                value.CopyTo(stream);
            }

            // Save the file p  ath in your SQL database
            // Assuming you have a PartsDal.Insert method that handles the database insertion
            return true;
        }

        public bool AddPart(PartDTO value)
        {
            PartForDevice newPart = value.FromPartDTO();
            new DAL.PartsDal().Insert(newPart);

            return true;
        }

        public void remove(int id)
        {
            BL.PartBL part = new BL.PartBL();
            var p = part.GetParts().FirstOrDefault(i => i.PartForDeviceId == id);
            new DAL.PartsDal().Delete(p);
        }

        public bool UpdatePart(PartDTO value)
        {
            return new DAL.PartsDal().Update(value.FromPartDTO());
        }

        // Helper method to retrieve the image from the file system
        private byte[] GetPartImageFromFileSystem(string filePath)
        {
            try
            {
                if (filePath is null || filePath?.Length < 1)
                {
                    return null;
                }

                string path = Path.Combine("../Uploads", filePath);
                // Read the file and convert it to byte array
                return File.ReadAllBytes(path);

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public IEnumerable<DAL.DbModels.PartForDevice> GetPartsByCategory(int categoryId, int userId)
        {
            return GetPartsByCreationDate(userId)
                .Select((part) =>
                {
                    part.Contact = new BL.UserBL().GetUserById(part.ContactId);
                    return part;
                })
                .Where((partDetails) => partDetails.CategoryId == categoryId);
        }

        public PartImage[] GetPartImages()
        {
            return new DAL.PartsDal()
            .GetAll()
            .Select((part) =>
            {
                PartImage imageFile = new();
                imageFile.PartForDeviceId = part.PartForDeviceId;
                imageFile.FileImage = GetPartImageFromFileSystem(part.PartImage);
                return imageFile;
            }).ToArray();
        }

        // חיפוש חכם
        public List<PartDTO> FreeSearch(string searchStr)
        {
            IEnumerable<PartForDevice> parts = GetParts();
            var searchWords = searchStr.ToLowerInvariant().Split(' ', StringSplitOptions.RemoveEmptyEntries);
            var result = new List<PartDTO>();

            foreach (var part in parts)
            {
                PartDTO partDTO = PartDTO.FromPartDal(part);
                var partHashTable = partDTO.ToHashtable();

                int matchCount = 0;
                foreach (var word in searchWords)
                {
                    if (partHashTable.Values.Cast<string>().Any(value => value != null && value.ToLower().Contains(word.ToLower())))
                    {
                        matchCount++;
                    }
                }

                if (matchCount > 0)
                {
                    partDTO.MatchCount = matchCount;
                    result.Add(partDTO);
                }
            }

            return result.OrderByDescending(x => x.MatchCount).ToList();
        }

        public bool ChangePartAvailability(int partForDeviceId)
        {
            try
            {
                PartForDevice p = GetParts(true).FirstOrDefault(i => i.PartForDeviceId == partForDeviceId);
                if (p != null)
                {
                    PartDTO part = PartDTO.FromPartDal(p);
                    part.IsAvailable = "0";
                    return UpdatePart(part);
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }


    }
}
