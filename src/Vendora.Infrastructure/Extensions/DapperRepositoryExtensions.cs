using System;
using System.Linq;
using System.Reflection;
using Vendora.Application.Extensions;
using Vendora.Infrastructure.Helpers;
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
            
            return services;
        }

        public static void AddQueryGenerator(this IServiceCollection services)
        {
            var assembly = Assembly.GetAssembly(typeof(QueryGenerator));
            var mapTypes = assembly.GetLoadableTypes().Where(x => x.IsImplementedInterface(typeof(IEntityMap)));
            var mapDictionary = mapTypes.ToDictionary(
                mapType => mapType
                    .GetInterfaces()
                    .First(x => x.GetGenericTypeDefinitionOrDefault() == typeof(IEntityMap<>))
                    .GetGenericArguments().First(),
                mapType => (IEntityMap)Activator.CreateInstance(mapType)
            );

            services.AddSingleton<IEntityMapCollection>(new EntityMapCollection(mapDictionary));
            services.AddSingleton<IQueryGenerator, QueryGenerator>();
        }
    }
}
