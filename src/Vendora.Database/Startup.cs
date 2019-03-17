using FluentMigrator;
using FluentMigrator.Runner;
using FluentMigrator.Runner.Initialization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Text;
using Vendora.Database.Services;

namespace Vendora.Database
{
    public class Startup
    {
        public Startup(IConfiguration configuration, string environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        public IConfiguration Configuration { get; }

        public string Environment { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var optionsSection = Configuration.GetSection("MigrationOptions");
            var migrationOptions = optionsSection.Get<MigrationOptions>();
            services.Configure<MigrationOptions>(optionsSection);

            services.AddSingleton<MigrationService>();

            services.AddFluentMigratorCore();
            services.ConfigureRunner(builder =>
            {
                builder.AddMySql5();
                builder.WithGlobalConnectionString(migrationOptions.DatabaseConnection);
                builder.ScanIn(typeof(Program).Assembly).For.Migrations().For.EmbeddedResources();
                builder.WithVersionTable(new VersionTableMetaData());
            });
            services.AddLogging(lb => lb.AddFluentMigratorConsole());
            services.Configure<RunnerOptions>(opt => Environment.ToLower());
        }
    }
}
