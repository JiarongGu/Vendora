using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Microsoft.Extensions.Hosting
{
    public static class ServiceCollectionExtensions
    {
        private static readonly string CONFIGURE_SERVICES_METHOD = "ConfigureServices";

        public static IServiceCollection UseStartup<TStartup>(this IServiceCollection services) where TStartup : class
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";

            var configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{environment}.json", optional: true)
                .AddEnvironmentVariables()
                .Build();

            var type = typeof(TStartup);
            var startup = type
                .GetConstructor(new[] { typeof(IConfiguration), typeof(string) })
                .Invoke(new object[] { configuration, environment });

            var method = type.GetMethod(CONFIGURE_SERVICES_METHOD);
            method.Invoke(startup, new object[] { services });

            return services;
        }
    }
}
