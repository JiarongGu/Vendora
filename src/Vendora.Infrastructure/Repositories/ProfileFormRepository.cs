using Dapper;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;
using Vendora.Application.Models.Entities;
using Vendora.Application.Models.Options;
using Vendora.Application.Repositories;
using Vendora.Infrastructure.Helpers;

namespace Vendora.Infrastructure.Repositories
{
    public class ProfileFormRepository : DapperRepository, IProfileFormRepository
    {
        private readonly IQueryFactory _queryFactory;

        public ProfileFormRepository(IOptions<ConnectionStringsOptions> connectionStrings, IQueryGenerator queryGenerator)
            : base(connectionStrings.Value.Vendora)
        {
            _queryFactory = queryGenerator.GetFactory<ProfileForm>();
        }

        public async Task<ProfileForm> InsertAsync(ProfileForm profileForm)
        {
            using (var connection = GetConnection())
            {
                await connection.QueryAsync(_queryFactory.GetQuery(QueryType.Insert), ProfileForm.New(profileForm));
                return profileForm;
            }
        }
        
        public async Task<Profile> UpdateAsync(Profile profile)
        {
            using (var connection = GetConnection())
            {
                var recordsAffected = await connection.ExecuteAsync(
                    _queryFactory.GetQuery(QueryType.UpdateById), Profile.Update(profile)
                );

                if (recordsAffected != 1)
                    throw new Exception($"Problem occurred while updating profile with Id {profile.Id}");

                return profile;
            }
        }

        public Task<ProfileForm> UpdateAsync(ProfileForm profile)
        {
            throw new NotImplementedException();
        }

        public async Task<ProfileForm> SelectByIdAsync(string id)
        {
            using (var connection = GetConnection())
            {
                return await connection.QueryFirstAsync<ProfileForm>(
                    _queryFactory.GetQuery(QueryType.SelectById), new { Id = id }
                );
            }
        }
    }
}
