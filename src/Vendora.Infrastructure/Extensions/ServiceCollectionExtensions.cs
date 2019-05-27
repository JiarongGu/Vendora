using Microsoft.Extensions.Configuration;
using Vendora.Application.Repositories;
using Vendora.Infrastructure.EntityMaps;
using Vendora.Infrastructure.Helpers;
using Vendora.Infrastructure.Repositories;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static void AddInfrastructureModules(this IServiceCollection services, IConfiguration configuration)
        {
            // entity maps
            services.AddTransient<IEntityMap, ProfileMap>();
            services.AddTransient<IEntityMap, FormMap>();
            services.AddTransient<IEntityMap, ProfileFormMap>();

            services.AddSingleton<IProfileRepository, ProfileRepository>();

            services.AddSingleton<IQueryGenerator, QueryGenerator>();
        }
    }
}
