using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using Vendora.Infrastructure.Mapping;

namespace Vendora.Infrastructure
{
    public class EntityQueryCollection
    {
        public IDictionary<QueryType, string> Queries { get; set; }

        public IEnumerable<(string property, string column, QueryType queryType)> Properties { get; set; }

        public string TableName { get; set; }
    }


    public interface IQueryGenerator {
        string GetQuery<TEntity>(QueryType queryType);
        string GetTableName<TEntity>();

        Func<QueryType, string> GetTypedBuilder<TEntity>();
    }

    public class QueryGenerator: IQueryGenerator
    {
        private readonly IDictionary<Type, EntityQueryCollection> _entityQueries;
        private readonly IEntityMapCollection _entityMapCollection;
        private object _generationLock = new object();

        public QueryGenerator(IEntityMapCollection entityMapCollection) {
            _entityMapCollection = entityMapCollection;
            _entityQueries = new Dictionary<Type, EntityQueryCollection>();
        }

        public Func<QueryType, string> GetTypedBuilder<TEntity>() {
            return GetQuery<TEntity>;
        }

        public string GetQuery<TEntity>(QueryType queryType) {
            if (queryType == QueryType.All || queryType == QueryType.None)
                throw new ArgumentException("Invalid queryType, using all or none");
            
            return GetEntityCollectiony<TEntity>().Queries[queryType];
        }

        public string GetTableName<TEntity>() {
            return GetEntityCollectiony<TEntity>().TableName;
        }

        private EntityQueryCollection GetEntityCollectiony<TEntity>() {
            var entityType = typeof(TEntity);
            if (!_entityQueries.ContainsKey(entityType))
            {
                lock (_generationLock)
                {
                    if (!_entityQueries.ContainsKey(entityType))
                    {
                        _entityQueries[entityType] = CreateQueryCollection(entityType);
                    }
                }
            }
            return _entityQueries[typeof(TEntity)];
        }

        private EntityQueryCollection CreateQueryCollection(Type entityType) {
            var map = _entityMapCollection.Maps.ContainsKey(entityType) ? _entityMapCollection.Maps[entityType] : null;
            var properties = entityType.GetProperties(BindingFlags.Instance | BindingFlags.SetProperty | BindingFlags.GetProperty | BindingFlags.Public);
            var collection = new EntityQueryCollection();

            collection.Properties = properties.Select(property => {
                var column = property.Name;
                var queryType = QueryType.All;

                if (map != null && map.PropertyMaps.ContainsKey(property)) {
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
            else {
                collection.TableName = entityType.Name;
            }

            collection.Queries = GenerateQueries(collection.Properties, collection.TableName);
            return collection;
        }

        private IDictionary<QueryType, string> GenerateQueries(IEnumerable<(string property, string column, QueryType queryType)> properties, string tableName) {
            var queries = new Dictionary<QueryType, string>();
            // query fragments
            queries[QueryType.Result] = GetResultQuery(properties, QueryType.Result);

            // basic crud query
            queries[QueryType.Select] = $"SELECT {GetResultQuery(properties, QueryType.Select)} FROM `{tableName}`";
            queries[QueryType.Update] = GetUpdateQuery(properties, tableName);
            queries[QueryType.Insert] = GetInsertQuery(properties, tableName);
            return queries;
        }

        private string GetResultQuery(IEnumerable<(string property, string column, QueryType queryType)> properties, QueryType queryType) {
            return string.Join(", ", properties.Where(x => CheckBAnd(x.queryType, queryType)).Select(x => $"`{x.column}` as `{x.property}`"));
        }

        private string GetUpdateQuery(IEnumerable<(string property, string column, QueryType queryType)> properties, string tableName) {
            var setQuery = string.Join(", ", properties.Where(x => CheckBAnd(x.queryType, QueryType.Update)).Select(x => $"`{x.column}` = @{x.property}"));
            return $"UPDATE `{tableName}` SET {setQuery};";
        }

        private string GetInsertQuery(IEnumerable<(string property, string column, QueryType queryType)> properties, string tableName) {
            var requiredProperties = properties.Where(x => CheckBAnd(x.queryType, QueryType.Insert));
            var columns = string.Join(", ", requiredProperties.Select(x => $"`{x.column}`"));
            var values = string.Join(", ", requiredProperties.Select(x => $"@{x.property}"));

            return $"INSERT INTO `{tableName}` ({columns}) VALUES ({values});";
        }

        private bool CheckBAnd(QueryType falgs, QueryType queryType) {
            return (falgs & queryType) == queryType;
        }
    }
}
