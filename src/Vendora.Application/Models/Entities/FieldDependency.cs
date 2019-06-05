using System.Collections.Generic;

namespace Vendora.Application.Models.Entities
{
    public class FieldDependency
    {
        public string Name { get; set; }

        public IEnumerable<string> Values { get; set; }

        public string Parttern { get; set; }
    }
}
