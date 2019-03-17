using FluentMigrator;
using FluentMigrator.Runner;
using Microsoft.Extensions.CommandLineUtils;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Vendora.Database.Services
{
    public class MigrationService
    {
        private readonly IMigrationRunner _runner;
        private MigrationOptions _options;

        public MigrationService(IMigrationRunner runner, IOptions<MigrationOptions> options) {
            _runner = runner;
            _options = options.Value;
        }

        public void RunCommands(IDictionary<MigrationCommand, CommandOption> commands) {
            if (commands[MigrationCommand.ShowLatest].HasValue())
            {
                ShowLatestMigration();
                return;
            }

            EnsureDatabaseCreated();

            if (commands[MigrationCommand.Rollback].HasValue())
            {
                RollbackMigration(commands[MigrationCommand.Rollback]);
                return;
            }

            MigrateUp();
        }

        private void MigrateUp() {
            // Validate version 14 digits
            var migrations = Assembly.GetExecutingAssembly().GetTypes().Where(t => t.IsSubclassOf(typeof(Migration)));

            foreach (var migration in migrations)
            {
                var attribute = migration.GetCustomAttributes(typeof(MigrationAttribute), false).Cast<MigrationAttribute>().FirstOrDefault();
                if (attribute != null && attribute.Version.ToString().Length != 14)
                    throw new Exception($"Migration {migration.Name} needs to have a MigrationAttribute with a version that is 14 digits (YYYYMMDDHHMMSS)");
            }

            // migrate up
            _runner.MigrateUp();
        }

        private void RollbackMigration(CommandOption command) {
            var vaild = long.TryParse(command.Value(), out var roolbackVersion);

            if (!vaild)
                throw new ArgumentException("Invalid version to roll back");

            _runner.MigrateDown(roolbackVersion);
        }

        private void ShowLatestMigration()
        {
            var migrations = Assembly.GetExecutingAssembly().GetTypes().Where(t => t.IsSubclassOf(typeof(Migration)));
            var latestMigration = migrations.Max(migration =>
            {
                var attribute = migration.GetCustomAttributes(typeof(MigrationAttribute), false).Cast<MigrationAttribute>().FirstOrDefault();
                return attribute.Version;
            });

            Console.WriteLine($"latest version: {latestMigration}");
        }

        private void EnsureDatabaseCreated() {
            using (var connection = new MySqlConnection(_options.Connection))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = 
                    $"CREATE DATABASE IF NOT EXISTS {_options.Database} " + 
                    $"DEFAULT CHARACTER SET {_options.Charset} COLLATE {_options.Collect};";
                command.ExecuteNonQuery();
                connection.Close();
            }
        }
    }
}
