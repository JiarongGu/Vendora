using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Vendora.Application.Models.Common;
using Vendora.Application.Models.Entities;
using Vendora.Application.Services;

namespace Vendora.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FormsController : ControllerBase
    {
        private readonly IFormService _formService;

        public FormsController(IFormService formService)
        {
            _formService = formService;
        }

        [HttpGet("{name}")]
        public async Task<IEnumerable<Form>> GetByChunk([FromRoute]string name, [FromQuery]string language)
        {
            if (!string.IsNullOrEmpty(language))
            {
                return new List<Form> { await _formService.FetchByNameAndLanguageAsync(name, language) };
            }
            else {
                return await _formService.FetchByNameAsync(name);
            }
        }

        [HttpGet]
        public async Task<Chunked<Form>> GetByChunk([FromQuery]int skip, [FromQuery]int take)
        {
            return await _formService.FetchByChunkAsync(skip, take);
        }

        [HttpPost]
        public async Task<Form> Post([FromBody] Form form)
        {
            return await _formService.CreateForm(form);
        }
    }
}