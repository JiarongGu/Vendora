using System;
using System.Collections.Generic;
using System.Text;

namespace Vendora.Infrastructure.Mapping
{
    public interface IEntityMapCollection {
        IDictionary<Type, IEntityMap> Maps { get; }
    }

    public class EntityMapCollection: IEntityMapCollection
    {
        public EntityMapCollection(IDictionary<Type, IEntityMap> maps) {
            Maps = maps;
        }

        public IDictionary<Type, IEntityMap> Maps { get; }
    }
}
