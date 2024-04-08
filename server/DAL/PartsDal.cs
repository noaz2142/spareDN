using DAL.DbModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class PartsDal
    {
        public bool Insert(PartForDevice d)
        {
            try
            {
                using (DbModels.DevicePartsContext ctx = new())
                {
                    ctx.PartForDevices.Add(d);
                    ctx.SaveChanges();
                    return true;
                }
            }
            catch (Exception)
            {
                return false;

            }
        }
        public bool Delete(PartForDevice d)
        {
            try
            {
                using (DbModels.DevicePartsContext ctx = new())
                {
                    ctx.PartForDevices.Remove(d);
                    ctx.SaveChanges();
                    return true;
                }
            }
            catch (Exception)
            {
                return false;

            }
        }

        public bool Update(PartForDevice d)
        {
            try
            {
                using (DbModels.DevicePartsContext ctx = new())
                {
                    ctx.PartForDevices.Attach(d);
                    ctx.Entry(d).State = EntityState.Modified;
                    ctx.SaveChanges();
                    return true;
                }
            }
            catch (Exception)
            {
                return false;

            }
        }

        public IEnumerable<DbModels.PartForDevice> GetAll(bool getRemoved = false)
        {
            try
            {
                using (DbModels.DevicePartsContext ctx = new DbModels.DevicePartsContext())
                {
                    if (getRemoved)
                    {
                        return ctx.PartForDevices.ToList();
                    }
                    return ctx.PartForDevices.ToList().Where(p => !String.Equals("0", p.IsAvailable));
                }
            }
            catch (Exception)
            {
                return null;

            }
        }

        // fetch category list

        public IEnumerable<DbModels.Category> GetAllCategory()
        {
            try
            {
                using (DbModels.DevicePartsContext ctx = new DbModels.DevicePartsContext())
                {
                    return ctx.Categories.ToList();

                }
            }
            catch (Exception)
            {
                return null;

            }
        }

    }
}
