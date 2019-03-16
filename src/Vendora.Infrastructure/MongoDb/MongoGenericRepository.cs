using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Vendora.Application.Models;
using Vendora.Application.Repositories;

namespace Vendora.Infrastructure.MongoDb
{
    public class MongoGenericRepository<TEntity> : IGenericRepository<TEntity>  where TEntity : IEntity
    {
        private readonly IMongoCollection<TEntity> _collection;

        public MongoGenericRepository(MongoDbContext context)
        {
            _collection = context.GetCollection<TEntity>();
        }

        public async Task DeleteAysnc(string id)
        {
            await _collection.DeleteOneAsync(x => x.Id == id);
        }

        public async Task<TEntity> GetAsync(string id)
        {
            return await _collection.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<TEntity>> GetAsync(int skip, int take)
        {
            return await _collection.AsQueryable().Skip(skip).Take(take).ToListAsync();
        }

        public async Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> expression, int? skip = null, int? take = null)
        {
            return await _collection.Find(expression).Skip(skip).Limit(take).ToListAsync();
        }

        public async Task<IEnumerable<TEntity>> GetAsync(int? skip = null, int? take = null)
        {
            if(take == null)
                return await _collection.AsQueryable().Skip(skip ?? 0).ToListAsync();
            return await _collection.AsQueryable().Skip(skip ?? 0).Take(take ?? 0).ToListAsync();
        }

        public async Task<IEnumerable<TProjection>> GetAsync<TProjection>(
            Expression<Func<TEntity, bool>> findExpression,
            Expression<Func<TEntity, TProjection>> projectExpression)
        {
            return await _collection.Find(findExpression).Project(projectExpression).ToListAsync();
        }

        public async Task<Chunked<TEntity>> GetChunkedEntities(int skip, int take) {
            var entities = await GetAsync(skip, take);
            var total = await CountAsync();

            return new Chunked<TEntity>
            {
                Total = total,
                Skip = skip,
                Take = take,
                Models = entities
            };
        }

        public async Task<Chunked<TEntity>> GetChunkedEntities(Expression<Func<TEntity, bool>> expression, int skip, int take)
        {
            var entities = await GetAsync(expression, skip, take);
            var total = await CountAsync(expression);

            return new Chunked<TEntity>
            {
                Total = total,
                Skip = skip,
                Take = take,
                Models = entities
            };
        }

        public async Task InsertOneAsync(TEntity entity)
        {
            await _collection.InsertOneAsync(entity);
        }

        public async Task ReplaceAsync(string id, TEntity entity)
        {
            await _collection.ReplaceOneAsync(x => x.Id == id, entity);
        }

        public Task UpdateAsync(string id, TEntity entity)
        {
            throw new NotImplementedException();
        }

        public async Task<long> CountAsync(Expression<Func<TEntity, bool>> expression = null) {
            return await _collection.CountDocumentsAsync(expression);
        }
    }
}
