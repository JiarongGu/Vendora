using System;

namespace Vendora.Application.Models
{
    public class Profile
    {
        public string Id { get; set; }

        public string AccountId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }
    }
}
