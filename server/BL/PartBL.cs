using DAL;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.DbModels;


namespace BL
{
    public class PartBL
    {
        public bool SaveNewPart(DAL.DbModels.PartForDevice p)
        {
            try
            {
                PartsDal d = new PartsDal();
                
                d.Insert(p);
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

        public void AddPart(PartForDevice value)
        {
            if (value.Contact == null)
            {
                value.Contact = new UserBL().GetUserById(value.ContactId);
            }
            new DAL.PartsDal().Insert(value);
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
    }
}
