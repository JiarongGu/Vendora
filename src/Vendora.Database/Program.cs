using Microsoft.Extensions.CommandLineUtils;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using Vendora.Database.Services;

namespace Vendora.Database
{

    public class Program
    {
        static void Main(string[] args)
        {
            var app = new CommandLineApplication();
            var commandOptions = ConfgiureCommandOptions(app);

            var services = new ServiceCollection().UseStartup<Startup>().BuildServiceProvider(false);

            app.OnExecute(() =>
            {
                services.GetService<MigrationService>().RunCommands(commandOptions);
                return 0;
            });

            app.Execute(args);
        }

        static IDictionary<MigrationCommand, CommandOption> ConfgiureCommandOptions(CommandLineApplication app)
        {
            app.HelpOption("-h|--help");

            var rollback = app.Option(
                "-r|--rollback <version>",
                "The specific version to rollback to.",
                CommandOptionType.SingleValue
            );

            var showLatest = app.Option(
                "-l|--latest",
                "Show the latest migration.",
                CommandOptionType.NoValue
            );

            var commandOptions = new Dictionary<MigrationCommand, CommandOption> {
                { MigrationCommand.Rollback, rollback },
                { MigrationCommand.ShowLatest, showLatest}
            };

            return commandOptions;
        }
    }
}