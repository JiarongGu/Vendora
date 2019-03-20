using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;
using Vendora.Application.Models;
using Vendora.Application.Repositories;
using Vendora.Infrastructure.Mapping;

namespace Vendora.Infrastructure.Repositories
{
    public class ProfileRepository : DapperRepository, IProfileRepository
    {
        private readonly Func<QueryType, string> _queries;
        private readonly string _tableName;

        public ProfileRepository(IConfiguration configuration, IQueryGenerator queryGenerator) : base(configuration)
        {
            _queries = queryGenerator.GetTypedBuilder<Profile>();
            _tableName = queryGenerator.GetTableName<Profile>();
        }

        public async Task<Profile> InsertAsync(Profile profile) {
            profile.Id = Guid.NewGuid().ToString();
            profile.CreatedDate = DateTime.UtcNow;
            profile.UpdatedDate = profile.CreatedDate;

            using (var connection = GetConnection()) {
                await connection.QueryAsync(_queries(QueryType.Insert), profile);
                return profile;
            }
        }

        public async Task<Profile> SelectByIdAsync(string id) {
            using (var connection = GetConnection())
            {
                var query = $"{_queries(QueryType.Select)} WHERE id = @Id";
                return await connection.QueryFirstAsync<Profile>(query, new { Id = id });
            }
        }
    }
}
