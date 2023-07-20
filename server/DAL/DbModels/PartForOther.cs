using System;
using System.Collections.Generic;

namespace DAL.DbModels;

public partial class PartForOther
{
    public int PartForOtherId { get; set; }

    public int? PartForDeviceId { get; set; }

    public string? PartStatus { get; set; }

    public int? UserId { get; set; }

    public DateTime? DateForTaken { get; set; }

    public int? Price { get; set; }

    public virtual PartForDevice? PartForDevice { get; set; }

    public virtual User? User { get; set; }
}
