using System.Collections.Generic;
using System.Linq;

namespace Vendora.Application.Models.Entities
{
    public class FieldData
    {
        public string FieldDescriptorName { get; set; }

        public IEnumerable<string> Values { get; set; } = Enumerable.Empty<string>();
    }
}
