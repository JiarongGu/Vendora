using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Vendora.Application.Models;

namespace Vendora.Application.Repositories
{
    public interface IProfileRepository
    {
        Task<Profile> InsertAsync(Profile profile);

        Task<Profile> SelectByIdAsync(string id);

        Task<Profile> UpdateAsync(Profile profile);
    }
}
