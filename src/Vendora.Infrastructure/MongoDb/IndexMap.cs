using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Vendora.Infrastructure.MongoDb
{
    public interface IIndexMap {
        void CreateIndexes(MongoDbContext context);
    }

    public abstract class IndexMap<T> : IIndexMap
    {
        public void CreateIndexes(MongoDbContext context)
        {
            var models = CreateIndexModels();
            context.GetCollection<T>().Indexes.CreateManyAsync(models).ConfigureAwait(false);
        }

        private IEnumerable<CreateIndexModel<T>>  CreateIndexModels() {
            var definitions = new List<IndexKeysDefinition<T>>();
            var definitionBuilder = Builders<T>.IndexKeys;
            Configure(definitions, definitionBuilder);
            return definitions.Select(x => new CreateIndexModel<T>(x));
        }

        protected abstract void Configure(List<IndexKeysDefinition<T>> definitions, IndexKeysDefinitionBuilder<T> definitionBuilder);
    }
}
