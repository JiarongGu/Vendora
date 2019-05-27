using System;

namespace Vendora.Application.Models.Entities
{
    public interface IEntity
    {
        string Id { get; set; }

        DateTime CreatedDate { get; set; }

        DateTime UpdatedDate { get; set; }

        DateTime DeletedDate { get; set; }
    }

    public abstract class Entity<T> : IEntity where T : class, IEntity, new()
    {
        public string Id { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public DateTime DeletedDate { get; set; }

        public static T New(T entity = default)
        {
            var newEntity = entity ?? new T();
            var dateTimeNow = DateTime.UtcNow;
            newEntity.Id = Guid.NewGuid().ToString();
            newEntity.CreatedDate = dateTimeNow;
            newEntity.UpdatedDate = dateTimeNow;
            return newEntity;
        }

        public static T Update(T entity)
        {
            entity.UpdatedDate = DateTime.UtcNow;
            return entity;
        }
    }
}
