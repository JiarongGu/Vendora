using System.Threading.Tasks;
using Vendora.Application.Models.Entities;

namespace Vendora.Application.Repositories
{
    public interface IFormRepository
    {
        Task<Form> InsertAsync(Form profile);

        Task<Form> FetchByIdAsync(string id);

        Task<Form> UpdateAsync(Form profile);

        Task<Form> FetchByNameAndLanguageAsync(string name, string language);
    }
}
