﻿using DAL;
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

        public User? GetExistingUser(string userName, string password)
        {
            try
            {
                return new DAL.UserDal().GetUsers()
                    .FirstOrDefault((user) => user.UserName.ToLower() == userName.ToLower() && user.UserPassword == password);

            }
            catch
            {
                return null;
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

        public bool CheckNewUser(string userName, string? password)
        {
            try
            {
                User user = GetExistingUser(userName, password);
                if (user != null)
                {
                    DAL.PartsDal partDal = new();
                    List<DAL.DbModels.PartForDevice> partList = partDal.GetAll().ToList();
                    return partList.FirstOrDefault(x => x.ContactId == user.UserId) == null;
                }
                return true;
            }
            catch
            {
                return false;
            }

        }
    }
}
