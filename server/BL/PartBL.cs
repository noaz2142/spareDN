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
            /*  DAL.partDAL partDAL = new DAL.partDAL();*/

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

            // Generate a unique filename or use the original filename, depending on your requirements
            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(value.FileName);

            // Set the path where you want to save the file on the server
            string filePath = Path.Combine("../Uploads", fileName);

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
            //if (value.PartImage == null || value.PartImage.Length == 0)
            //    return false;

            //// Generate a unique filename or use the original filename, depending on your requirements
            //string fileName = Guid.NewGuid().ToString() + Path.GetExtension(value.PartImage.FileName);

            //// Set the path where you want to save the file on the server
            //string filePath = Path.Combine("../Uploads", fileName);

            //using (var stream = new FileStream(filePath, FileMode.Create))
            //{
            //    value.PartImage.CopyTo(stream);
            //}

            // Save the file path in your SQL database
            // Assuming you have a PartsDal.Insert method that handles the database insertion
            PartForDevice newPart = PartForDevice.FromPartDTO(value);
            // newPart.PartImage = filePath;
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

        public IEnumerable<DAL.DbModels.PartForDevice> GetPartsByCategory(int categoryId)
        {
            /*  DAL.partDAL partDAL = new DAL.partDAL();*/

            return new DAL.PartsDal()
                .GetAll()
                .Select((part) =>
                {
                    part.Contact = new BL.UserBL().GetUserById(part.ContactId);
                    return part;
                })
                .Where((partDetails) => partDetails.CategoryId == categoryId);
        }

        ////בשביל לשמור תמונה
        //public async static void SaveFile(IFormFile postedFile)
        //{
        //    var filePath = AppDomain.CurrentDomain.BaseDirectory.Substring(0,
        //            AppDomain.CurrentDomain.BaseDirectory.LastIndexOf("Server") - 1) +
        //            "\\Data\\src\\images\\" + postedFile.FileName;
        //    if (postedFile.Length > 0)
        //    {
        //        using (Stream fileStream = new FileStream(filePath, FileMode.Create))
        //        {
        //            await postedFile.CopyToAsync(fileStream);
        //        }
        //    }
        //}
    }
}
