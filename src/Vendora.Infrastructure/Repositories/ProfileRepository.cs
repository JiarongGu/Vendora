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
        private readonly string ID_WHERE_CLAUSE = "WHERE id = @Id";


        public ProfileRepository(IConfiguration configuration, IQueryGenerator queryGenerator) : base(configuration)
        {
            _queries = queryGenerator.GetTypedBuilder<Profile>();
            _tableName = queryGenerator.GetTableName<Profile>();
        }

        public async Task<Profile> InsertAsync(Profile profile) {
            using (var connection = GetConnection()) {
                await connection.QueryAsync(_queries(QueryType.Insert), Profile.New(profile));
                return profile;
            }
        }

        public async Task<Profile> SelectByIdAsync(string id) {
            using (var connection = GetConnection())
            {
                var query = $"{_queries(QueryType.Select)} {ID_WHERE_CLAUSE}";
                return await connection.QueryFirstAsync<Profile>(query, new { Id = id });
            }
        }

        public async Task<Profile> UpdateAsync(Profile profile)
        {
            using (var connection = GetConnection())
            {
                var query = $"{_queries(QueryType.Update)} {ID_WHERE_CLAUSE}";
                var recordsAffected = await connection.ExecuteAsync(query, Profile.Update(profile));

                if (recordsAffected != 1)
                    throw new Exception($"Problem occurred while updating subscription with Id {profile.Id}");

                return profile;
            }
        }
    }
}
