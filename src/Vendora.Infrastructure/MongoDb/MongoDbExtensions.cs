using MongoDB.Bson.Serialization;
using System;
using System.Linq.Expressions;
using System.Reflection;
using System.Text.RegularExpressions;

namespace Vendora.Infrastructure.MongoDb.Extensions
{
    public static class MongoDbExtensions
    {
        public static BsonMemberMap MapIdFieldWithName<TEntity, TMember>(this BsonClassMap<TEntity> classMap, Expression<Func<TEntity, TMember>> fieldLambda)
        {
            return classMap.MapIdField(fieldLambda, GetFieldName(fieldLambda));
        }

        public static BsonMemberMap MapIdPropertyWithName<TEntity, TMember>(this BsonClassMap<TEntity> classMap, Expression<Func<TEntity, TMember>> propertyLambda)
        {
            return classMap.MapIdProperty(propertyLambda, GetFieldName(propertyLambda));
        }

        public static BsonMemberMap MapIdField<TEntity, TMember>(this BsonClassMap<TEntity> classMap, Expression<Func<TEntity, TMember>> fieldLambda, string elementName) {
            return classMap.MapIdField(fieldLambda).SetElementName(elementName);
        }

        public static BsonMemberMap MapField<TEntity, TMember>(this BsonClassMap<TEntity> classMap, Expression<Func<TEntity, TMember>> fieldLambda, string elementName)
        {
            return classMap.MapField(fieldLambda).SetElementName(elementName);
        }

        public static BsonMemberMap MapMember<TEntity, TMember>(this BsonClassMap<TEntity> classMap, Expression<Func<TEntity, TMember>> memberLambda, string elementName)
        {
            return classMap.MapMember(memberLambda).SetElementName(elementName);
        }

        public static BsonMemberMap MapIdProperty<TEntity, TMember>(this BsonClassMap<TEntity> classMap, Expression<Func<TEntity, TMember>> propertyLambda, string elementName)
        {
            return classMap.MapIdProperty(propertyLambda).SetElementName(elementName);
        }

        public static BsonMemberMap MapProperty<TEntity, TMember>(this BsonClassMap<TEntity> classMap, Expression<Func<TEntity, TMember>> propertyLambda, string elementName)
        {
            return classMap.MapProperty(propertyLambda).SetElementName(elementName);
        }

        public static BsonMemberMap MapFieldWithName<TEntity, TMember>(this BsonClassMap<TEntity> classMap, Expression<Func<TEntity, TMember>> fieldLambda)
        {
            var name = GetFieldName(fieldLambda);
            return classMap.MapField(fieldLambda, name);
        }

        public static BsonMemberMap MapPropertyWithName<TEntity, TMember>(this BsonClassMap<TEntity> classMap, Expression<Func<TEntity, TMember>> propertyLambda)
        {
            var name = GetFieldName(propertyLambda);
            return classMap.MapProperty(propertyLambda, name);
        }

        public static BsonMemberMap MapMemberWithName<TEntity, TMember>(this BsonClassMap<TEntity> classMap, Expression<Func<TEntity, TMember>> memberLambda)
        {
            var name = GetFieldName(memberLambda);
            return classMap.MapMember(memberLambda, name);
        }

        private static string GetFieldName<TEntity, TMember>(Expression<Func<TEntity, TMember>> expression)
        {
            var memberExpression = expression.Body as MemberExpression;
            var propertyInfo = memberExpression.Member as PropertyInfo;
            var name = Regex.Replace(propertyInfo.Name, @"(?<!_)([A-Z])", "_$1").ToLower().Trim('_');
            return name;
        }
    }
}
