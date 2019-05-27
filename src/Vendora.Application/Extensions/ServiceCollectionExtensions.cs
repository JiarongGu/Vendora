using Microsoft.Extensions.Configuration;
using Serilog;
using Vendora.Application.Models.Options;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCoreModules(this IServiceCollection services, IConfiguration configuration)
        {
            var vendoraConnectionString = configuration.GetConnectionString("Vendora");
            services.Configure<ConnectionStringsOptions>(configuration.GetSection("ConnectionStrings"));

            // logging
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Verbose()
                .WriteTo.Console()
                .WriteTo.MySQL(vendoraConnectionString)
                .CreateLogger();

            services.AddLogging(loggingBuilder =>
                loggingBuilder.AddSerilog(dispose: true)
            );
            
            return services;
        }
    }
}
