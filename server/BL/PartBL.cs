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
using DTO;

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
                d.Insert(PartForDevice.FromPartDTO(p));
                return true;
            }
            catch
            {
                return false;
            }

        }
        public IEnumerable<DAL.DbModels.PartForDevice> GetParts()
        {
            /*  DAL.partDAL partDAL = new DAL.partDAL();*/

            return new DAL.PartsDal().GetAll();
        }

        public IEnumerable<DAL.DbModels.Category> GetCategoryList()
        {
            return new DAL.PartsDal().GetAllCategory();
        }

        public IEnumerable<DAL.DbModels.PartForDevice> GetPartsByName(string nameToSearch, int categoryId)
        {
            if (categoryId != -1)
            {
                return GetPartsByCategory(categoryId).Where(x => x.PartName.Contains(nameToSearch, StringComparison.OrdinalIgnoreCase));
            }
            return new DAL.PartsDal().GetAll().Where(x => x.PartName.Contains(nameToSearch, StringComparison.OrdinalIgnoreCase));
        }

        public IEnumerable<DAL.DbModels.PartForDevice> GetPartsByCity(string city, string state = "Israel", int categoryId = -1)
        {
            return GetPartsByCategory(categoryId).Where(x => x.Contact.City.Contains(city, StringComparison.OrdinalIgnoreCase));
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

            // Save the file path in your SQL database
            // Assuming you have a PartsDal.Insert method that handles the database insertion
            return true;
        }

        public bool AddPart(DAL.DtoModels.PartDTO value)
        {
            PartForDevice newPart = PartForDevice.FromPartDTO(value);
            new DAL.PartsDal().Insert(newPart);

            return true;
        }

        public void remove(int id)
        {
            BL.PartBL part = new BL.PartBL();
            var p = part.GetParts().FirstOrDefault(i => i.PartForDeviceId == id);
            new DAL.PartsDal().Delete(p);
        }

        public void UpdatePart(PartForDevice value)
        {
            new DAL.PartsDal().Update(value);

        }

        // Helper method to retrieve the image from the file system
        private byte[] GetPartImageFromFileSystem(string filePath)
        {
            try
            {
                if (filePath?.Length < 1)
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

        public IEnumerable<DAL.DbModels.PartForDevice> GetPartsByCategory(int categoryId)
        {
            return new DAL.PartsDal()
                .GetAll()
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


    }
}
