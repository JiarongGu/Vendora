using Dapper;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;
using Vendora.Application.Models.Entities;
using Vendora.Application.Repositories;
using Vendora.Infrastructure.Helpers;
using Vendora.Infrastructure.Models;

namespace Vendora.Infrastructure.Repositories
{
    public class ProfileRepository : DapperRepository, IProfileRepository
    {
        private readonly Func<QueryType, string> _queryFactory;

        public ProfileRepository(IOptions<ConnectionStringsOptions> connectionStrings, IQueryGenerator queryGenerator)
            : base(connectionStrings.Value.Vendora)
        {
            _queryFactory = queryGenerator.GetFactory<Profile>();
        }

        public async Task<Profile> InsertAsync(Profile profile)
        {
            using (var connection = GetConnection())
            {
                await connection.QueryAsync(_queryFactory(QueryType.Insert), Profile.New(profile));
                return profile;
            }
        }

        public async Task<Profile> SelectByIdAsync(string id)
        {
            using (var connection = GetConnection())
            {
                return await connection.QueryFirstAsync<Profile>(_queryFactory(QueryType.SelectById), new { Id = id });
            }
        }

        public async Task<Profile> UpdateAsync(Profile profile)
        {
            using (var connection = GetConnection())
            {
                var recordsAffected = await connection.ExecuteAsync(_queryFactory(QueryType.UpdateById), Profile.Update(profile));

                if (recordsAffected != 1)
                    throw new Exception($"Problem occurred while updating profile with Id {profile.Id}");

                return profile;
            }
        }
    }
}
