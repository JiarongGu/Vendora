using System.Reflection;

namespace Vendora.Infrastructure.Helpers
{
    public interface IPropertyMap
    {
        string ColumnName { get; }

        PropertyInfo PropertyInfo { get; }

        QueryType IgnoredQueries { get; }
    }

    public class PropertyMap : IPropertyMap
    {
        public PropertyMap(PropertyInfo propertyInfo) => PropertyInfo = propertyInfo;

        public PropertyInfo PropertyInfo { get; }

        public string ColumnName { get; private set; }

        public QueryType IgnoredQueries { get; private set; }

        public PropertyMap ToColumn(string columnName)
        {
            ColumnName = columnName;
            return this;
        }

        public PropertyMap IgnoreQueries(QueryType queryType)
        {
            IgnoredQueries = queryType;
            return this;
        }
    }
}
