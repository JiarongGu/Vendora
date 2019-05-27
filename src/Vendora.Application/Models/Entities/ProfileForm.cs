using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Vendora.Application.Models.Entities
{
    public class ProfileForm: Entity<ProfileForm>
    {
        public string ProfileId { get;set; }

        public string FormId { get; set; }

        public Form FormSnapshot { get; set; }

        public IEnumerable<FieldData> FormData { get; set; } = Enumerable.Empty<FieldData>();
    }
}
