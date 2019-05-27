using System.Threading.Tasks;
using Vendora.Application.Models.Entities;

namespace Vendora.Application.Repositories
{
    public interface IFormRepository
    {
        Task<Form> InsertAsync(Form profile);

        Task<Form> SelectByIdAsync(string id);

        Task<Form> UpdateAsync(Form profile);
    }
}
