using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Vendora.Application.Models.Entities;
using Vendora.Application.Services;
using Vendora.Web.Models;

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

        [HttpGet("{id}")]
        public async Task<Form> GetById([FromRoute]Guid id)
        {
            return await _formService.FetchByIdAsync(id);
        }

        [HttpGet]
        public async Task<IEnumerable<Form>> Get([FromQuery]GetFormsRequest request)
        {
            return await _formService.FetchAsync(request.Name, request.Language, request.Skip, request.Take);
        }

        [HttpPost]
        public async Task<Form> Post([FromBody] Form form)
        {
            return await _formService.CreateForm(form);
        }
    }
}