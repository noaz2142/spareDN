using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public partial class PartDTO
    {
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
    }
}
