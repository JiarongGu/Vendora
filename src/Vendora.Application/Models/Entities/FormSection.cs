using System.Collections.Generic;

namespace Vendora.Application.Models.Entities
{
    public class FormSection
    {
        public string Label { get; set; }

        public int Order { get; set; }

        public IEnumerable<FieldDescriptor> FieldDescriptors { get; set; }
    }
}
