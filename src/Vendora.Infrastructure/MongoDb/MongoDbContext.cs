using MongoDB.Driver;
using System;

namespace Vendora.Infrastructure.MongoDb
{
    public class MongoDbContext
    {
        private readonly MongoClient _mongoClient;
        private readonly IMongoDatabase _database;
        private readonly MongoDbOptions _config;
        private readonly MongoDbRegistration<MongoDbContext> _registration;

        public MongoDbContext(MongoDbOptions config, MongoDbRegistration<MongoDbContext> registration)
        {
            _config = config;
            if (_config == null)
            {
                throw new ArgumentException("no config!");
            }

            _mongoClient = new MongoClient(_config.ConnectionString);
            _database = _mongoClient.GetDatabase(_config.DatabaseName);
            _registration = registration;
        }

        public IMongoCollection<TDocument> GetCollection<TDocument>(string name = null)
        {
            var collectionName = name ?? _registration.CollectionNames[typeof(TDocument)];
            return _database.GetCollection<TDocument>(collectionName);
        }

        public bool IsCollectionEmpty<TDocument>(string name = null)
        {
            return !GetCollection<TDocument>(name).AsQueryable().Any();
        }
        
        public virtual void OnConfiguring()
        {
            foreach (var indexMap in _registration.IndexMaps)
                indexMap.CreateIndexes(this);
        }
    }
}