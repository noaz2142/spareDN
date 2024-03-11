using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.DtoModels
{
    public class PartImage
    {
        public byte[] FileImage { get; set; }
        public int PartForDeviceId { get; set; }
    }
}
