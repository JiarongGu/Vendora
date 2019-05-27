using System;
using System.Collections.Generic;
using System.Linq;
using Vendora.Application.Models.Entities;

namespace Vendora.Infrastructure.Helpers
{
    public interface IQueryGenerator
    {
        IQueryFactory GetFactory<TEntity>();
    }

    public class QueryGenerator : IQueryGenerator
    {
        private readonly IDictionary<Type, QueryCollection> _queryCollections;

        public QueryGenerator(IEnumerable<IEntityMap> entityMaps)
        {
            _queryCollections = entityMaps.ToDictionary(x => x.EntityType, x => CreateQueryCollection(x));
        }

        public IQueryFactory GetFactory<TEntity>()
        {
            return new QueryFactory(_queryCollections[typeof(TEntity)]);
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

            collection.PropertyColumns = entityMap.PropertyMaps.ToDictionary(x => x.PropertyName, x => x.ColumnName);

            collection.Queries = GenerateQueries(collection.Properties, collection.TableName, collection.PropertyColumns);

            return collection;
        }

        private IDictionary<QueryType, string> GenerateQueries(IEnumerable<(string property, string column, QueryType queryType)> properties, string tableName, IDictionary<string, string> propertyColumns)
        {
            var queries = new Dictionary<QueryType, string>();
            // query fragments
            queries[QueryType.Result] = GetResultQuery(properties, QueryType.Result);
            queries[QueryType.NotDeleted] = $"{propertyColumns[nameof(IEntity.DeletedDate)]} IS NULL";

            // basic crud query
            queries[QueryType.Select] = $"SELECT {GetResultQuery(properties, QueryType.Select)} FROM `{tableName}`";
            queries[QueryType.SelectById] = $"{GetResultQuery(properties, QueryType.SelectById)} WHERE id = @Id";
            queries[QueryType.SelectNotDeleted] = $"{GetResultQuery(properties, QueryType.SelectNotDeleted)} WHERE {queries[QueryType.NotDeleted]}";

            queries[QueryType.Update] = GetUpdateQuery(properties, tableName, QueryType.Update);
            queries[QueryType.UpdateById] = $"{GetUpdateQuery(properties, tableName, QueryType.UpdateById)} WHERE id = @Id";

            queries[QueryType.Insert] = GetInsertQuery(properties, tableName);
            return queries;
        }

        private string GetResultQuery(IEnumerable<(string property, string column, QueryType queryType)> properties, QueryType queryType)
        {
            return string.Join(", ", properties.Where(x => CheckBAnd(x.queryType, queryType)).Select(x => $"`{x.column}` as `{x.property}`"));
        }

        private string GetUpdateQuery(IEnumerable<(string property, string column, QueryType queryType)> properties, string tableName, QueryType queryType)
        {
            var setQuery = string.Join(", ", properties.Where(x => CheckBAnd(x.queryType, queryType)).Select(x => $"`{x.column}` = @{x.property}"));
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
