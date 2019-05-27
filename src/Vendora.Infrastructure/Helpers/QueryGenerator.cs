using System;
using System.Collections.Generic;
using System.Linq;

namespace Vendora.Infrastructure.Helpers
{
    public interface IQueryGenerator
    {
        string GetQuery<TEntity>(QueryType queryType);
        
        Func<QueryType, string> GetFactory<TEntity>();
    }

    public class QueryGenerator : IQueryGenerator
    {
        private readonly static string ID_WHERE_CLAUSE = "WHERE id = @Id";
        private readonly IDictionary<Type, QueryCollection> _queryCollections;
        private object _generationLock = new object();

        public QueryGenerator(IEnumerable<IEntityMap> entityMaps)
        {
            _queryCollections = entityMaps.ToDictionary(x => x.EntityType, x => CreateQueryCollection(x));
        }

        public Func<QueryType, string> GetFactory<TEntity>()
        {
            return GetQuery<TEntity>;
        }

        public string GetQuery<TEntity>(QueryType queryType)
        {
            if (queryType == QueryType.All || queryType == QueryType.None)
                throw new ArgumentException("Invalid queryType, using all or none");

            return GetQueryCollection<TEntity>().Queries[queryType];
        }

        private QueryCollection GetQueryCollection<TEntity>()
        {
            return _queryCollections[typeof(TEntity)];
        }

        private QueryCollection CreateQueryCollection(IEntityMap entityMap)
        {
            var collection = new QueryCollection();

            collection.Properties = entityMap.PropertyMaps.Select(propertyMap =>
            {
                var queryType = QueryType.All ^ propertyMap.IgnoredQuery;
                return (propertyMap.PropertyName, propertyMap.ColumnName, queryType);
            });
            
            collection.TableName = entityMap.TableName;

            collection.Queries = GenerateQueries(collection.Properties, collection.TableName);

            return collection;
        }

        private IDictionary<QueryType, string> GenerateQueries(IEnumerable<(string property, string column, QueryType queryType)> properties, string tableName)
        {
            var queries = new Dictionary<QueryType, string>();
            // query fragments
            queries[QueryType.Result] = GetResultQuery(properties, QueryType.Result);

            // basic crud query
            queries[QueryType.Select] = $"SELECT {GetResultQuery(properties, QueryType.Select)} FROM `{tableName}`";
            queries[QueryType.SelectById] = $"{queries[QueryType.Select]} {ID_WHERE_CLAUSE}";

            queries[QueryType.Update] = GetUpdateQuery(properties, tableName);
            queries[QueryType.UpdateById] = $"{queries[QueryType.Select]} {ID_WHERE_CLAUSE}";

            queries[QueryType.Insert] = GetInsertQuery(properties, tableName);
            return queries;
        }

        private string GetResultQuery(IEnumerable<(string property, string column, QueryType queryType)> properties, QueryType queryType)
        {
            return string.Join(", ", properties.Where(x => CheckBAnd(x.queryType, queryType)).Select(x => $"`{x.column}` as `{x.property}`"));
        }

        private string GetUpdateQuery(IEnumerable<(string property, string column, QueryType queryType)> properties, string tableName)
        {
            var setQuery = string.Join(", ", properties.Where(x => CheckBAnd(x.queryType, QueryType.Update)).Select(x => $"`{x.column}` = @{x.property}"));
            return $"UPDATE `{tableName}` SET {setQuery}";
        }

        private string GetInsertQuery(IEnumerable<(string property, string column, QueryType queryType)> properties, string tableName)
        {
            var requiredProperties = properties.Where(x => CheckBAnd(x.queryType, QueryType.Insert));
            var columns = string.Join(", ", requiredProperties.Select(x => $"`{x.column}`"));
            var values = string.Join(", ", requiredProperties.Select(x => $"@{x.property}"));

            return $"INSERT INTO `{tableName}` ({columns}) VALUES ({values})";
        }

        private bool CheckBAnd(QueryType falgs, QueryType queryType)
        {
            return (falgs & queryType) == queryType;
        }
    }
}
