using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;
using Vendora.Application.Models;
using Vendora.Application.Repositories;

namespace Vendora.Infrastructure.Repositories
{
    public class ProfileRepository : DapperRepository, IProfileRepository
    {
        public ProfileRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<Profile> InsertAsync(Profile profile) {
            profile.Id = Guid.NewGuid().ToString();
            profile.CreatedDate = DateTime.UtcNow;
            profile.UpdatedDate = profile.CreatedDate;

            using (var connection = GetConnection()) {
                await connection.QueryAsync(ProfileRepositoryQueries.Insert, profile);
                return profile;
            }
        }

        public async Task<Profile> SelectByIdAsync(string id) {
            using (var connection = GetConnection())
            {
                return await connection.QueryFirstAsync<Profile>(ProfileRepositoryQueries.SelectById, new { Id = id });
            }
        }
    }
}
