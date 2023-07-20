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
                using (DbModels.SpareDnContext ctx = new())
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
                using (DbModels.SpareDnContext ctx = new())
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
                using (DbModels.SpareDnContext ctx = new())
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

        public IEnumerable<DbModels.PartForDevice> GetAll()
        {
            try
            {
                using (DbModels.SpareDnContext ctx = new DbModels.SpareDnContext())         
                {
                   return  ctx.PartForDevices.ToList();
                     
                }
            }
            catch (Exception)
            {
                return null;

            }
        }

    }
}
