using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Vendora.Application.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCoreModules(this IServiceCollection services)
        {
            return services;
        }
    }
}
