using System;

namespace Vendora.Application.Models.Entities
{
    public class Form: Entity<Form>
    {
        public string Name { get; set; }

        public string LanguageCode { get; set; }

        public FormMetadata Metadata { get; set; }
    }
}
