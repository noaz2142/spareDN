using System;
using System.Collections.Generic;

namespace DAL.DbModels;

public partial class Category
{
    public int CategorId { get; set; }

    public string Description { get; set; } = null!;

    public virtual ICollection<PartForDevice> PartForDevices { get; } = new List<PartForDevice>();
}
