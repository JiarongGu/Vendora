using Dapper;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;

namespace Vendora.Infrastructure.Repositories
{
    public abstract class DapperRepository
    {
        private readonly string _connectionString;

        protected DapperRepository(string connectionString)
        {
            _connectionString = connectionString;

            SqlMapper.AddTypeHandler(new DynamicTypeHandler());
            SqlMapper.AddTypeHandler(new GuidTypeHandler());
        }

        protected MySqlConnection GetConnection() => new MySqlConnection(_connectionString);
    }
}
