using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;

namespace Vendora.Infrastructure.Mapping
{
    public interface IEntityMap
    {
        IDictionary<PropertyInfo, IPropertyMap> PropertyMaps { get; }
        string TableName { get; }
    }

    public interface IEntityMap<TEntity>: IEntityMap where TEntity : class { }

    public abstract class EntityMap<TEntity> : IEntityMap<TEntity> where TEntity : class
    {
        private readonly Dictionary<PropertyInfo, IPropertyMap> _propertyMaps;

        public EntityMap() {
            _propertyMaps = new Dictionary<PropertyInfo, IPropertyMap>();
            TableName = typeof(TEntity).Name;
        }

        public IDictionary<PropertyInfo, IPropertyMap> PropertyMaps => _propertyMaps;
        
        public string TableName { get; protected set; }
        
        protected PropertyMap Map(Expression<Func<TEntity, object>> expression)
        {
            var propertyInfo = (PropertyInfo)ReflectionHelper.GetMemberInfo(expression);
            var propertyMap = new PropertyMap(propertyInfo);
            _propertyMaps[propertyInfo] = propertyMap;
            return propertyMap;
        }
    }
}
