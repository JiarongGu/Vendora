using System;

namespace Vendora.Application.Models.Entities
{
    public class Profile : Entity<Profile>
    {
        public string AccountId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }
    }
}
