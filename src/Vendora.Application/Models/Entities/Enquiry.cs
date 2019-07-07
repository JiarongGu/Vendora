using System;
using System.Collections.Generic;
using System.Text;

namespace Vendora.Application.Models.Entities
{
    public class Enquiry : Entity<Enquiry>
    {
        public Guid FormId { get; set; }

        public string Reference { get; set; }

        public EnquiryMetadata EnquiryMetadata { get; set; }
    }
}
