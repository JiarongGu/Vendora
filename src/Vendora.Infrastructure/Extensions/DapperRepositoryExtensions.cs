using BanBrick.Utils.Extensions;
using Dapper.FluentMap;
using Dapper.FluentMap.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Vendora.Infrastructure.Repositories;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DapperRepositoryExtensions
    {
        public static IServiceCollection AddDapperRepositories(this IServiceCollection services, ServiceLifetime serviceLifetime = ServiceLifetime.Scoped) {
            var assembly = Assembly.GetAssembly(typeof(DapperRepository));
            var loadableTypes = assembly.GetLoadableTypes();
            var repositories = loadableTypes.Where(x => x.IsClassAssignableFrom(typeof(DapperRepository)));

            foreach (var repository in repositories)
            {
                var interfaces = repository.GetInterfaces().ToList();
                interfaces.ForEach(i => services.Add(new ServiceDescriptor(i, repository, serviceLifetime)));   
            }

            InitializeFluentMapper(loadableTypes);

            return services;
        }

        private static void InitializeFluentMapper(IEnumerable<Type> loadableTypes)
        {
            var mapTypes = loadableTypes.Where(x => x.IsImplementedInterface(typeof(IEntityMap)));

            FluentMapper.Initialize(config =>
            {
                var addMapMethod = config.GetType().GetMethod("AddMap");
                foreach (var mapType in mapTypes)
                {
                    var entityType = mapType
                        .GetInterfaces()
                        .First(x => x.GetGenericTypeDefinitionOrDefault() == typeof(IEntityMap<>))
                        .GetGenericArguments().First();

                    var mapInstance = Activator.CreateInstance(mapType);
                    addMapMethod.MakeGenericMethod(entityType).Invoke(config, new object[] { mapInstance });
                }
            });
        }
    }
}
