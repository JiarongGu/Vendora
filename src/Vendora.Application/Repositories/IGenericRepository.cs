using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Vendora.Application.Models;

namespace Vendora.Application.Repositories
{
    public interface IGenericRepository<TEntity> where TEntity : IEntity
    {
        Task DeleteAysnc(string id);

        Task<TEntity> GetAsync(string id);

        Task<IEnumerable<TEntity>> GetAsync(int skip, int take);

        Task<IEnumerable<TEntity>> GetAsync(int? skip = null, int? take = null);

        Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> expression, int? skip = null, int? take = null);

        Task<IEnumerable<TProjection>> GetAsync<TProjection>(Expression<Func<TEntity, bool>> findExpression, Expression<Func<TEntity, TProjection>> projectExpression);

        Task<Chunked<TEntity>> GetChunkedEntities(Expression<Func<TEntity, bool>> expression, int skip, int take);

        Task<Chunked<TEntity>> GetChunkedEntities(int skip, int take);

        Task InsertOneAsync(TEntity entity);

        Task ReplaceAsync(string id, TEntity entity);

        Task UpdateAsync(string id, TEntity entity);

        Task<long> CountAsync(Expression<Func<TEntity, bool>> expression = null);
    }
}
