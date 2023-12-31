﻿using System;
using System.Collections.Generic;

namespace DAL.DbModels;

public partial class PartForDevice
{
    public int PartForDeviceId { get; set; }

    public string? PartName { get; set; }

    public string? PartImage { get; set; }

    public string? Description { get; set; }

    public decimal Price { get; set; }

    public int ContactId { get; set; }

    public int CategoryId { get; set; }

    public string PartStatus { get; set; } = null!;

    public virtual Category Category { get; set; } = null!;

    public virtual User Contact { get; set; } = null!;
}
