using System;
using System.Collections.Generic;

namespace DAL.DbModels;

public partial class PartForDevice
{
    public int PartForDeviceId { get; set; }

    public string? PartName { get; set; }

    public string? PartImage { get; set; }

    public int? OriginalPrice { get; set; }

    public virtual ICollection<PartForOther> PartForOthers { get; } = new List<PartForOther>();
}
