using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Vendora.Application.Models.Entities;

namespace Vendora.Application.Repositories
{
    public interface IFormRepository
    {
        Task<Form> InsertAsync(Form profile);

        Task<Form> UpdateAsync(Form profile);

        Task<Form> FetchAsync(Guid id);

        Task<Form> FetchAsync(string name, string language);

        Task<IEnumerable<Form>> FetchAsync(string name);

        Task<IEnumerable<Form>> FetchAsync(int skip, int take);
    }
}
