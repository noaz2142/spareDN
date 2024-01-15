using System;
using System.Collections.Generic;

namespace DAL.DbModels;
using DAL.DtoModels;

public partial class PartForDevice
{
    public static PartForDevice FromPartDTO(PartDTO p)
    {
        PartForDevice partForDevice = new PartForDevice();
        partForDevice.Price = p.Price;
        partForDevice.PartLocationCity = p.PartLocationCity;
        partForDevice.PartStatus = p.PartStatus;
        partForDevice.PartLocationState = p.PartLocationState;
        partForDevice.PartImage = p.PartImage;
        partForDevice.PartName = p.PartName;
        partForDevice.CategoryId = p.CategoryId;
        partForDevice.ContactId = p.ContactId;
        partForDevice.Description = p.Description;
        //partForDevice.Contact = null;
        //partForDevice.Category=null
        return partForDevice;
    }
    public int PartForDeviceId { get; set; }

    public string? PartName { get; set; }

    public string? PartImage { get; set; }

    public string? Description { get; set; }

    public decimal Price { get; set; }

    public int ContactId { get; set; }

    public int CategoryId { get; set; }

    public string PartStatus { get; set; } = null!;

    public string? PartLocationCity { get; set; }

    public string? PartLocationState { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual User Contact { get; set; }
}
