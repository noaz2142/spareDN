using System;
using System.Collections.Generic;

namespace DAL.DbModels;

public partial class User
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string? UserPassword { get; set; }

    public string? LoginName { get; set; }

    public string? Mail { get; set; }

    public int? UserType { get; set; }

    public virtual ICollection<PartForOther> PartForOthers { get; } = new List<PartForOther>();
}
