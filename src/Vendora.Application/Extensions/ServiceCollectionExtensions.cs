using Microsoft.Extensions.Configuration;
using Serilog;
using Vendora.Application.Models.Options;
using Vendora.Application.Services;

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

            // services
            services.AddTransient<IFormService, FormService>();
            
            return services;
        }
    }
}
