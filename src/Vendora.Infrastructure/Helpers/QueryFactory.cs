using System;
using System.Collections.Generic;
using System.Linq;

namespace Vendora.Infrastructure.Helpers
{
    public interface IQueryFactory
    {
        string GetQuery(QueryType queryType);

        string GetColumn(string property);

        string GetColumnProperty(string separator, string property);

        IEnumerable<string> GetColumnProperties(string separator, params string[] properties);
    }

    public class QueryFactory : IQueryFactory
    {
        private readonly QueryCollection _queryCollection;

        public QueryFactory(QueryCollection queryCollection)
        {
            _queryCollection = queryCollection;
        }

        public string GetQuery(QueryType queryType)
        {
            if (queryType == QueryType.All || queryType == QueryType.None)
                throw new ArgumentException("Invalid queryType, using all or none");

            return _queryCollection.Queries[queryType];
        }

        public string GetColumn(string property)
        {
            return $"`{_queryCollection.PropertyColumns[property]}`";
        }

        public string GetColumnProperty(string separator, string property)
        {
            return $"{GetColumn(property)}{separator}{property}";
        }

        public IEnumerable<string> GetColumnProperties(string separator, params string[] properties)
        {
            return properties.Select(property => GetColumnProperty(separator, property));
        }
    }
}
