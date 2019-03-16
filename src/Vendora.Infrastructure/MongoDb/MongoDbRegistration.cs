using BanBrick.Utils.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Vendora.Infrastructure.MongoDb
{
    public class MongoDbRegistration<TContext>
    {
        public MongoDbRegistration()
        {
            var classMaps = ResolveClassMaps();
            var indexMaps = ResolveIndexMaps();

            Entities = classMaps.Select(x => x.ClassType);
            IndexMaps = indexMaps;

            CollectionNames = GetCollectionNames(classMaps);
        }

        public IEnumerable<Type> Entities { get; }

        public Dictionary<Type, string> CollectionNames { get; }

        public IEnumerable<IIndexMap> IndexMaps { get; }

        private IEnumerable<IClassMap> ResolveClassMaps()
        {
            var classMaps = Assembly.GetAssembly(typeof(MongoDbContext)).GetLoadableTypes()
               .Where(t => t.BaseType.GetGenericTypeDefinitionOrDefault() == typeof(ClassMap<>))
               .Select(t => (IClassMap)Activator.CreateInstance(t))
               .Where(c => !c.CollectionName.IsNullOrEmpty());

            return classMaps;
        }

        private IEnumerable<IIndexMap> ResolveIndexMaps()
        {
            var indexMaps = Assembly.GetAssembly(typeof(MongoDbContext)).GetLoadableTypes()
               .Where(t => t.GetInterfaces().Contains(typeof(IIndexMap)) && t != typeof(IndexMap<>))
               .Select(t => (IIndexMap)Activator.CreateInstance(t));

            return indexMaps;
        }

        private Dictionary<Type, string> GetCollectionNames(IEnumerable<IClassMap> classMaps)
        {
            return classMaps.ToDictionary(e => e.ClassType, e => e.CollectionName);
        }
    }
}