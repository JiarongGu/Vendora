using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Vendora.Infrastructure.Helpers
{
    public interface IQueryGenerator
    {
        string GetQuery<TEntity>(QueryType queryType);

        string GetTableName<TEntity>();

        QueryCollection GetQueryCollection<TEntity>();

        Func<QueryType, string> GetQueryFactory<TEntity>();
    }

    public class QueryGenerator : IQueryGenerator
    {
        private readonly IDictionary<Type, QueryCollection> _queryCollections;
        private readonly IDictionary<Type, IEntityMap> _entities;
        private object _generationLock = new object();

        public QueryGenerator(IEnumerable<IEntityMap> entityMaps)
        {
            _entities = entityMaps.ToDictionary(x => x.EntityType, x => x);
            _queryCollections = new Dictionary<Type, QueryCollection>();
        }

        public Func<QueryType, string> GetQueryFactory<TEntity>()
        {
            return GetQuery<TEntity>;
        }

        public string GetQuery<TEntity>(QueryType queryType)
        {
            if (queryType == QueryType.All || queryType == QueryType.None)
                throw new ArgumentException("Invalid queryType, using all or none");

            return GetQueryCollection<TEntity>().Queries[queryType];
        }

        public string GetTableName<TEntity>()
        {
            return GetQueryCollection<TEntity>().TableName;
        }

        public QueryCollection GetQueryCollection<TEntity>()
        {
            var entityType = typeof(TEntity);
            if (!_queryCollections.ContainsKey(entityType))
            {
                lock (_generationLock)
                {
                    if (!_queryCollections.ContainsKey(entityType))
                    {
                        _queryCollections[entityType] = CreateQueryCollection(entityType);
                    }
                }
            }
            return _queryCollections[typeof(TEntity)];
        }

        private QueryCollection CreateQueryCollection(Type entityType)
        {
            var map = _entities.ContainsKey(entityType) ? _entities[entityType] : null;
            var properties = entityType.GetProperties(BindingFlags.Instance | BindingFlags.SetProperty | BindingFlags.GetProperty | BindingFlags.Public);
            var collection = new QueryCollection();

            collection.Properties = properties.Select(property =>
            {
                var column = property.Name;
                var queryType = QueryType.All;

                if (map != null && map.PropertyMaps.ContainsKey(property))
                {
                    var propertyMap = map.PropertyMaps[property];
                    queryType = queryType ^ propertyMap.IgnoredQueries;
                    column = propertyMap.ColumnName ?? column;
                }
                return (property.Name, column, queryType);
            });

            if (map != null)
            {
                collection.TableName = map.TableName;
            }
            else
            {
                collection.TableName = entityType.Name;
            }

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
            queries[QueryType.Update] = GetUpdateQuery(properties, tableName);
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
