using System;
using System.Collections.Generic;

namespace DAL.DbModels;

public partial class PartForDevice
{
    public int PartForDeviceId { get; set; }

    public string? PartName { get; set; }

    public string? PartImage { get; set; }

    public string? Description { get; set; }

    public int ContactId { get; set; }

    public int CategoryId { get; set; }

    public string? PartLocationCity { get; set; }

    public string? PartLocationState { get; set; }

    public string IsAvailable { get; set; } = null!;

    public string? Model { get; set; }

    public string? Brand { get; set; }

    public string? Device { get; set; }

    public DateTime? CreationDate { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual User Contact { get; set; } = null!;
}
