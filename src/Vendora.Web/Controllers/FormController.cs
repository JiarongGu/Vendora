using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Vendora.Web.Controllers
{
    [ApiController]
    public class FormController : ControllerBase
    {
        [HttpGet]
        public async Task Get([FromQuery]string name, [FromQuery]string lang)
        {

        }
    }
}