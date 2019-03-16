using System;
using System.Linq;
using BanBrick.Utils.Extensions;
using Microsoft.AspNetCore.Builder;
using Vendora.Application.Models;
using Vendora.Application.Repositories;
using Vendora.Infrastructure;
using Vendora.Infrastructure.MongoDb;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class MongoDbServiceExtensions
    {
        public static IApplicationBuilder UseMongoDb(this IApplicationBuilder app, Action<MongoDbContext> initalize = null)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<MongoDbContext>();

                context.OnConfiguring();

                initalize?.Invoke(context);
            }
            return app;
        }

        public static IServiceCollection AddMongoContext(
            this IServiceCollection serviceCollection,
            Func<MongoDbOptions, MongoDbOptions> optionsAction = null,
            ServiceLifetime contextLifetime = ServiceLifetime.Scoped,
            ServiceLifetime optionsLifetime = ServiceLifetime.Scoped
            )
        {
            var options = new MongoDbOptions();
            options = optionsAction?.Invoke(options) ?? options;

            var optionsService = new ServiceDescriptor(typeof(MongoDbOptions), x => options, optionsLifetime);
            var contextService = new ServiceDescriptor(typeof(MongoDbContext), typeof(MongoDbContext), contextLifetime);

            serviceCollection.Add(optionsService);
            serviceCollection.Add(contextService);
            serviceCollection.AddSingleton<MongoDbRegistration<MongoDbContext>>();
            
            return serviceCollection;
        }

        public static IServiceCollection AddMongoGenericRepositories(this IServiceCollection services)
        {
            var baseEntityTypes = new Type[] { typeof(IEntity) };

            var entities = AppDomain.CurrentDomain.GetAssemblies().SelectMany(x => x.GetLoadableTypes())
                .Where(x => x.IsImplementedInterface(typeof(IEntity)) && !baseEntityTypes.Contains(x));

            // Register MongoGenericRepositories
            entities.ToList().ForEach(e =>
            {
                var mongoRepositoryType = typeof(MongoGenericRepository<>).MakeGenericType(e);
                var domainRepositoryType = typeof(IGenericRepository<>).MakeGenericType(e);

                if (services.Any(i => i.ServiceType == domainRepositoryType))
                    throw new Exception($"repository injection error: {domainRepositoryType.Name} has already been injected");

                services.AddScoped(domainRepositoryType, mongoRepositoryType);
            });

            return services;
        }
    }
}