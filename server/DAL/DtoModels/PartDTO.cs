using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System;
using System.Collections;
using DAL.DbModels;
using Microsoft.AspNetCore.Http;
using System.Reflection;

public class IncludeInHashtableAttribute : Attribute { }

namespace DAL.DtoModels
{
    public partial class PartDTO
    {
        public static PartDTO FromPartDal(PartForDevice pDAL)
        {
            PartDTO partDTO = new();
            partDTO.Brand = pDAL.Brand;
            partDTO.PartForDeviceId = pDAL.PartForDeviceId;
            partDTO.PartName = pDAL.PartName;
            partDTO.PartImage = pDAL.PartImage;
            partDTO.PartLocationCity = pDAL.PartLocationCity;
            partDTO.ContactId = pDAL.ContactId;
            partDTO.Description = pDAL.Description;
            partDTO.CreationDate = pDAL.CreationDate;
            partDTO.Device = pDAL.Device;
            partDTO.IsAvailable = pDAL.IsAvailable;
            partDTO.Model = pDAL.Model;
            partDTO.CategoryId = pDAL.CategoryId;
            partDTO.PartLocationState = pDAL.PartLocationState;
            return partDTO;
        }

        public int? PartForDeviceId { get; set; }

        [IncludeInHashtable]
        public string PartName { get; set; }

        public string? PartImage { get; set; }

        [IncludeInHashtable]
        public string? Description { get; set; }

        public int ContactId { get; set; }

        public int CategoryId { get; set; }

        [IncludeInHashtable]
        public string? PartLocationCity { get; set; }

        [IncludeInHashtable]
        public string? PartLocationState { get; set; }

        public string? IsAvailable { get; set; } = null!;

        [IncludeInHashtable]
        public string? Model { get; set; }

        [IncludeInHashtable]
        public string? Brand { get; set; }

        [IncludeInHashtable]
        public string? Device { get; set; }

        public DateTime? CreationDate { get; set; }

        public int? MatchCount { get; set; }

        private PropertyInfo[] GetProperties()
        {
            var properties = GetType().GetProperties()
                .Where(prop => Attribute.IsDefined(prop, typeof(IncludeInHashtableAttribute)))
                .ToArray();
            return properties;
        }

        public Hashtable ToHashtable()
        {
            Hashtable hashtable = new Hashtable();

            foreach (var prop in GetProperties())
            {
                hashtable[prop.Name] = prop.GetValue(this)?.ToString()?.ToLowerInvariant();
            }

            return hashtable;
        }

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
            partDal.CategoryId = CategoryId;
            partDal.CreationDate = CreationDate;
            if (PartForDeviceId.HasValue)
            {
                partDal.PartForDeviceId = PartForDeviceId.Value;
            }

            return partDal;
        }

    }


}
