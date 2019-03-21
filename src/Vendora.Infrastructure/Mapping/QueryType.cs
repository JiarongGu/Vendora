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
        Select  = 0x0010 | Result,
        Insert  = 0x0020,
        Update  = 0x0040,

        // other types
        None    = 0x0000,
        All     = 0xFFFF,
    }
}
