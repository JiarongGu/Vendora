using System;

namespace Vendora.Infrastructure.Helpers
{
    [Flags]
    public enum QueryType
    {
        // fragment
        Result      = 0x0001,

        // basic query
        Select      = 0x0100 | Result,
        SelectById  = 0x0110 | Result,
        Insert      = 0x0200,
        Update      = 0x0400,
        UpdateById  = 0x0410,

        // other types
        None        = 0x0000,
        All         = 0xFFFF,
    }
}
