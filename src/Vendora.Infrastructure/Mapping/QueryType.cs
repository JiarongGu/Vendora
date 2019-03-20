using System;
using System.Collections.Generic;
using System.Text;

namespace Vendora.Infrastructure.Mapping
{

    [Flags]
    public enum QueryType
    {
        // fragment
        Result  = 0x0001,

        // basic query
        Select  = 0x0011,
        Insert  = 0x0022,
        Update  = 0x0044,

        // other types
        None    = 0x0000,
        All     = 0xFFFF,
    }
}
