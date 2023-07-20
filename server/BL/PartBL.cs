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

        public IEnumerable<DAL.DbModels.PartForDevice> GetPartsByName(string nameToSearch)
        {
            return new DAL.PartsDal().GetAll().Where(x => x.PartName == nameToSearch);
        }

        public void AddPart(PartForDevice value)
        {
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
    }
}
