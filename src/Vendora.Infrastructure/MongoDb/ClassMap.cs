using System;
using MongoDB.Bson.Serialization;

namespace Vendora.Infrastructure.MongoDb
{
    public interface IClassMap
    {
        string CollectionName { get; }
        Type ClassType { get; }
    }

    public abstract class ClassMap<T>: IClassMap
    {
        public string CollectionName { get; }

        public Type ClassType { get; }

        protected ClassMap()
        {
            ClassType = typeof(T);

            if (!BsonClassMap.IsClassMapRegistered(ClassType))
            {
                BsonClassMap.RegisterClassMap<T>(classMap =>
                {
                    classMap.AutoMap();
                    Configure(classMap);
                });
            }
        }

        protected ClassMap(string collectionName) : this()
        {
            CollectionName = collectionName;
        }

        protected abstract void Configure(BsonClassMap<T> classMap);
    }
}