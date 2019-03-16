using FluentMigrator;
using FluentMigrator.Runner;
using Microsoft.Extensions.CommandLineUtils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Vendora.Database.Services
{
    public class MigrationService
    {
        private readonly IMigrationRunner _runner;

        public MigrationService(IMigrationRunner runner) {
            _runner = runner;
        }

        public void RunCommands(IDictionary<MigrationCommand, CommandOption> commands) {
            if (commands[MigrationCommand.ShowLatest].HasValue())
            {
                var latestMigration = GetLatestMigration();
                Console.WriteLine(latestMigration);
            }
            else if(commands[MigrationCommand.Rollback].HasValue()) {
                var vaild = long.TryParse(commands[MigrationCommand.Rollback].Value(), out var roolbackVersion);

                if (!vaild)
                    throw new ArgumentException("Invalid version to roll back");

                _runner.MigrateDown(roolbackVersion);
            }
            else {
                _runner.MigrateUp();
            }
        }

        private void MigrateUp() {
            ValidateMigrationVersions();
            _runner.MigrateUp();
        }

        private void ValidateMigrationVersions()
        {
            // Validate 14 digits
            var migrations = Assembly.GetExecutingAssembly().GetTypes().Where(t => t.IsSubclassOf(typeof(Migration)));

            foreach (var migration in migrations)
            {
                var attribute = migration.GetCustomAttributes(typeof(MigrationAttribute), false).Cast<MigrationAttribute>().FirstOrDefault();
                if (attribute != null && attribute.Version.ToString().Length != 14)
                    throw new Exception($"Migration {migration.Name} needs to have a MigrationAttribute with a version that is 14 digits (YYYYMMDDHHMMSS)");
            }
        }

        private static long GetLatestMigration()
        {
            var migrations = Assembly.GetExecutingAssembly().GetTypes().Where(t => t.IsSubclassOf(typeof(Migration)));
            return migrations.Max(migration =>
            {
                var attribute = migration.GetCustomAttributes(typeof(MigrationAttribute), false).Cast<MigrationAttribute>().FirstOrDefault();
                return attribute.Version;
            });
        }
    }
}
