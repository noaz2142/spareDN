using DAL.DbModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class UserDal
    {
        public bool Insert(User newUser)
        {
            try
            {
                using (DbModels.DevicePartsContext ctx = new())
                {
                    ctx.Users.Add(newUser);
                    int numberOfChanges = ctx.SaveChanges();
                    return numberOfChanges > 0;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool Update(User updatedUser)
        {
            try
            {
                using (DbModels.DevicePartsContext ctx = new())
                {
                    ctx.Users.Attach(updatedUser);
                    ctx.Entry(updatedUser).State = EntityState.Modified;
                    ctx.SaveChanges();
                    return true;
                }
            }
            catch (DbUpdateConcurrencyException ex)
            {
                // Handle concurrency conflict here.
                // You can choose to retry the operation, report the conflict, etc.
                return false;
            }
            catch (Exception)
            {
                // Handle other exceptions here.
                return false;
            }
        }

        //    public IEnumerable<DbModels.PartForDevice> GetAll()
        //    {
        //        try
        //        {
        //            using (DbModels.DevicePartsContext ctx = new DbModels.DevicePartsContext())
        //            {
        //                return ctx.PartForDevices.ToList();

        //            }
        //        }
        //        catch (Exception)
        //        {
        //            return null;

        //        }
        //    }

        // fetch category list

        //public IEnumerable<DbModels.Category> GetAllCategory()
        //{
        //    try
        //    {
        //        using (DbModels.DevicePartsContext ctx = new DbModels.DevicePartsContext())
        //        {
        //            return ctx.Categories.ToList();
        //        }
        //    }
        //    catch (Exception)
        //    {
        //        return null;

        //    }
        //}

        public IEnumerable<DbModels.User> GetUsers()
        {
            try
            {
                using (DbModels.DevicePartsContext ctx = new DbModels.DevicePartsContext())
                {
                    return ctx.Users.ToList();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

    }
}
