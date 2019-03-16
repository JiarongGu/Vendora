using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace Vendora.Infrastructure.Repositories
{
    public interface IEnquiryRepository {

    }

    public class EnquiryRepository : DapperRepository, IEnquiryRepository
    {
        public EnquiryRepository(IConfiguration configuration) : base(configuration)
        {
        }


    }
}
