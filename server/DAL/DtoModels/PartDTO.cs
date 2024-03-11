using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.DbModels;
using Microsoft.AspNetCore.Http;

namespace DAL.DtoModels
{
    public partial class PartDTO
    {
        public string PartName { get; set; }

        public string? PartImage { get; set; }

        public string? Description { get; set; }

        public int ContactId { get; set; }

        public int CategoryId { get; set; }

        public string? PartLocationCity { get; set; }

        public string? PartLocationState { get; set; }

        public string? IsAvailable { get; set; } = null!;

        public string? Model { get; set; }

        public string? Brand { get; set; }

        public string? Device { get; set; }

        public PartForDevice FromPartDTO()
        {
            PartForDevice partDal = new();
            partDal.PartName = PartName;
            partDal.PartImage = PartImage;
            partDal.Description = Description;
            partDal.ContactId = ContactId;
            partDal.PartLocationCity = PartLocationCity;
            partDal.PartLocationState = PartLocationState;
            partDal.Brand = Brand;
            partDal.Model = Model;
            partDal.Device = Device;
            partDal.IsAvailable = IsAvailable;
            return partDal;
        }

    }


}
