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
    public class UserBL
    {
        public bool SaveNewUser(DAL.DbModels.User newUser)
        {
            try
            {
                UserDal user = new UserDal();
                return user.Insert(newUser);
            }
            catch
            {
                return false;
            }

        }

        public bool UpdateExistingUser(DAL.DbModels.User existingUser)
        {
            try
            {
                UserDal user = new UserDal();
                if (existingUser != null && GetUserById(existingUser.UserId) != null)
                {
                    user.Update(existingUser);
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }

        }
        public DAL.DbModels.User GetUserById(int userId)
        {
            return new DAL.UserDal().GetUsers().FirstOrDefault((user) => user.UserId == userId);
        }

        //public IEnumerable<DAL.DbModels.Category> GetCategoryList()
        //{
        //    /*  DAL.partDAL partDAL = new DAL.partDAL();*/

        //    return new DAL.PartsDal().GetAllCategory();
        //}

        //public IEnumerable<DAL.DbModels.PartForDevice> GetPartsByName(string nameToSearch, int categoryId)
        //{
        //    if (categoryId != -1)
        //    {
        //        return GetPartsByCategory(categoryId).Where(x => x.PartName.Contains(nameToSearch, StringComparison.OrdinalIgnoreCase));
        //    }
        //    return new DAL.PartsDal().GetAll().Where(x => x.PartName.Contains(nameToSearch, StringComparison.OrdinalIgnoreCase));
        //}

        //public void AddPart(PartForDevice value)
        //{
        //    new DAL.PartsDal().Insert(value);
        //}

        //public void remove(int id)
        //{
        //    BL.PartBL part = new BL.PartBL();
        //    var p = part.GetParts().FirstOrDefault(i => i.PartForDeviceId == id);
        //    new DAL.PartsDal().Delete(p);
        //}

        //public void UpdatePart(PartForDevice value)
        //{
        //    new DAL.PartsDal().Update(value);

        //}

        //public IEnumerable<DAL.DbModels.PartForDevice> GetPartsByCategory(int categoryId)
        //{
        //    /*  DAL.partDAL partDAL = new DAL.partDAL();*/

        //    return new DAL.PartsDal().GetAll().Where((partDetails) => partDetails.CategoryId == categoryId);
        //}
    }
}
