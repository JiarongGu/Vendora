using Dapper;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;

namespace Vendora.Infrastructure.Repositories
{
    public abstract class DapperRepository
    {
        private readonly string _connectionString;

        protected DapperRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Vendora");

            SqlMapper.AddTypeHandler(new DynamicTypeHandler());
        }

        protected MySqlConnection GetConnection() => new MySqlConnection(_connectionString);
    }
}
