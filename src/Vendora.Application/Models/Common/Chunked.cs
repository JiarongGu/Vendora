using System.Collections.Generic;

namespace Vendora.Application.Models.Common
{
    public class Chunked<TEntity>
    {
        public long Skip { get; set; }

        public long Take { get; set; }

        public IEnumerable<TEntity> Entities { get; set; }
    }
}
