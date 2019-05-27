using Vendora.Application.Repositories;
using Vendora.Infrastructure.EntityMaps;
using Vendora.Infrastructure.Helpers;
using Vendora.Infrastructure.Repositories;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static void AddInfrastructureModules(this IServiceCollection services)
        {
            services.AddTransient<IEntityMap, ProfileMap>();
            services.AddSingleton<IProfileRepository, ProfileRepository>();

            services.AddSingleton<IQueryGenerator, QueryGenerator>();
        }
    }
}
