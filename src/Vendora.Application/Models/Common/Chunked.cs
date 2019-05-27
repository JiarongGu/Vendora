using System.Collections.Generic;

namespace Vendora.Application.Models.Common
{
    public class Chunked<TModel>
    {
        public long Total { get; set; }

        public long Skip { get; set; }

        public long Take { get; set; }

        public IEnumerable<TModel> Models { get; set; }
    }
}
