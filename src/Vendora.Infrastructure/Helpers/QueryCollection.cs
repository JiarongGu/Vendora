using System.Collections.Generic;

namespace Vendora.Infrastructure.Helpers
{
    public class QueryCollection
    {
        public IDictionary<QueryType, string> Queries { get; set; }

        public IEnumerable<(string property, string column, QueryType queryType)> Properties { get; set; }

        public string TableName { get; set; }
    }
}
