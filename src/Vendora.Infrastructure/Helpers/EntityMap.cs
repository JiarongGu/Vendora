using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Vendora.Application.Models.Entities;

namespace Vendora.Infrastructure.Helpers
{
    public interface IEntityMap
    {
        IEnumerable<PropertyMap> PropertyMaps { get; }

        Type EntityType { get; }

        string TableName { get; }
    }

    public interface IEntityMap<TEntity> : IEntityMap where TEntity : IEntity { }


    public abstract class EntityMap<TEntity> : IEntityMap<TEntity> where TEntity : IEntity
    {
        private readonly Dictionary<PropertyInfo, PropertyMap> _propertyMaps;

        public EntityMap()
        {
            _propertyMaps = EntityType
                .GetProperties(BindingFlags.Instance | BindingFlags.SetProperty | BindingFlags.GetProperty | BindingFlags.Public)
                .ToDictionary(x => x, x => new PropertyMap(x.Name));

            TableName = typeof(TEntity).Name.ToLower();

            // default maps
            Map(x => x.Id)
                .IgnoreQuery(QueryType.Update);

            Map(x => x.CreatedDate)
               .ToColumn("created_date")
               .IgnoreQuery(QueryType.Update);

            Map(x => x.UpdatedDate)
                .ToColumn("updated_date");

            Map(x => x.DeletedDate)
                .ToColumn("deleted_date")
                .IgnoreQuery(QueryType.Insert);
        }
        
        public string TableName { get; protected set; }

        public Type EntityType => typeof(TEntity);

        public IEnumerable<PropertyMap> PropertyMaps => _propertyMaps.Select(x => x.Value);

        protected PropertyMap Map(Expression<Func<TEntity, object>> expression)
        {
            var propertyInfo = (PropertyInfo)ReflectionHelper.GetMemberInfo(expression);
            var propertyMap = new PropertyMap(propertyInfo.Name);
            _propertyMaps[propertyInfo] = propertyMap;
            return propertyMap;
        }
    }
}
