using System.Reflection;

namespace Vendora.Infrastructure.Helpers
{
    public class PropertyMap
    {
        public PropertyMap(string propertyName)
        {
            PropertyName = propertyName;
            ColumnName = propertyName.ToLower();
        }

        public string PropertyName { get; private set; }

        public string ColumnName { get; private set; }

        public QueryType IgnoredQuery { get; private set; }

        public PropertyMap ToColumn(string columnName)
        {
            ColumnName = columnName;
            return this;
        }

        public PropertyMap IgnoreQuery(QueryType queryType)
        {
            IgnoredQuery = queryType;
            return this;
        }
    }
}
