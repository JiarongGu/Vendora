using System;
using System.Collections.Generic;
using System.Text;
using Vendora.Application.Enums;

namespace Vendora.Application.Models.Entities
{
    public class Enquiry
    {
        public string UserId { get; set; }

        public EnquiryType EnquiryType { get; set; }
        
        public dynamic EnquiryDetail { get; set; }
    }
}
