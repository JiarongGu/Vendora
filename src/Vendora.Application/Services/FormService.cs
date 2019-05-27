using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Vendora.Application.Models.Entities;
using Vendora.Application.Repositories;

namespace Vendora.Application.Services
{
    public interface IFormService
    {

    }

    public class FormService
    {
        private readonly IFormRepository _formRepository;
        private readonly ILogger<FormService> _logger;

        public FormService(IFormRepository formRepository, ILogger<FormService> logger)
        {
            _formRepository = formRepository;
        }

        public Task<Form> FetchByNameAndLanguageAsync(string name, string language)
        {
            return _formRepository.FetchByNameAndLanguageAsync(name, language);
        }
    }
}
