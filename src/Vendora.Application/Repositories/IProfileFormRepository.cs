using System.Threading.Tasks;
using Vendora.Application.Models.Entities;

namespace Vendora.Application.Repositories
{
    public interface IProfileFormRepository
    {
        Task<ProfileForm> InsertAsync(ProfileForm profile);

        Task<ProfileForm> SelectByIdAsync(string id);

        Task<ProfileForm> UpdateAsync(ProfileForm profile);
    }
}
