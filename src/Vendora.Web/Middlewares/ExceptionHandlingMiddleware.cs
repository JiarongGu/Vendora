using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Net;
using System.Net.Http.Formatting;
using System.Threading.Tasks;

namespace Vendora.Web.Middlewares
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        
        public ExceptionHandlingMiddleware(RequestDelegate next)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await SendErrorResponse(context, (int)HttpStatusCode.InternalServerError, ex);
            }
        }

        private Task SendErrorResponse(HttpContext context, int statusCode, Exception exception)
        {
            context.Response.ContentType = JsonMediaTypeFormatter.DefaultMediaType.MediaType;
            context.Response.StatusCode = statusCode;
            return context.Response.WriteAsync(JsonConvert.SerializeObject(
                exception,
                new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() }
            ));
        }
    }
}
