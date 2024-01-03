using System;
using System.Collections.Generic;

namespace DAL.DbModels;

public partial class User
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string? UserPassword { get; set; }

    public string? Mail { get; set; }

    public string? Phone { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public virtual ICollection<PartForDevice> PartForDevices { get; } = new List<PartForDevice>();
}
