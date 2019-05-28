using System.Collections.Generic;

namespace Vendora.Application.Models.Entities
{
    public class FieldDescriptor
    {
        public string Name { get; set; }

        public string Label { get; set; }

        public string Type { get; set; }

        public string Placeholder { get; set; }

        public int Order { get; set; }

        public IEnumerable<FieldOption> FieldOptions { get; set; }

        public IEnumerable<ValidationRules> ValidationRules { get; set; }

        public IEnumerable<FieldDescriptor> FieldDescriptors { get; set; }
    }
}
