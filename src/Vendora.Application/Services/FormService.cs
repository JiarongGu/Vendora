using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Vendora.Application.Models.Entities;
using Vendora.Application.Repositories;

namespace Vendora.Application.Services
{
    public interface IFormService
    {
        Task<Form> CreateForm(Form form);
        Task<Form> FetchByIdAsync(Guid id);
        Task<IEnumerable<Form>> FetchAsync(string name, string language, int skip, int take);
    }

    public class FormService : IFormService
    {
        private readonly IFormRepository _formRepository;
        private readonly ILogger<FormService> _logger;

        public FormService(IFormRepository formRepository, ILogger<FormService> logger)
        {
            _formRepository = formRepository;
            _logger = logger;
        }

        public Task<Form> CreateForm(Form form)
        {
            return _formRepository.InsertAsync(form);
        }

        public Task<IEnumerable<Form>> FetchAsync(string name, string language, int skip, int take)
        {
            return _formRepository.FetchAsync(name, language, skip, take);
        }

        public Task<Form> FetchByIdAsync(Guid id)
        {
            return _formRepository.FetchAsync(id);
        }
    }
}
