using System;

namespace Vendora.Infrastructure.Helpers
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
