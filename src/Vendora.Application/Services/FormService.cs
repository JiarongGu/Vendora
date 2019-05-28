using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using Vendora.Application.Models.Common;
using Vendora.Application.Models.Entities;
using Vendora.Application.Repositories;

namespace Vendora.Application.Services
{
    public interface IFormService
    {
        Task<Form> CreateForm(Form form);
        Task<Form> FetchByNameAndLanguageAsync(string name, string language);
        Task<IEnumerable<Form>> FetchByNameAsync(string name);
        Task<Chunked<Form>> FetchByChunkAsync(int skip, int take);
    }

    public class FormService: IFormService
    {
        private readonly IFormRepository _formRepository;
        private readonly ILogger<FormService> _logger;

        public FormService(IFormRepository formRepository, ILogger<FormService> logger)
        {
            _formRepository = formRepository;
        }

        public Task<Form> CreateForm(Form form) {
            return _formRepository.InsertAsync(form);
        }

        public Task<Form> FetchByNameAndLanguageAsync(string name, string language)
        {
            return _formRepository.FetchAsync(name, language);
        }

        public Task<IEnumerable<Form>> FetchByNameAsync(string name)
        {
            return _formRepository.FetchAsync(name);
        }

        public async Task<Chunked<Form>> FetchByChunkAsync(int skip, int take) {
            var forms = await _formRepository.FetchAsync(skip, take);
            return new Chunked<Form> { Entities = forms, Skip = skip, Take = take };
        }
    }
}
