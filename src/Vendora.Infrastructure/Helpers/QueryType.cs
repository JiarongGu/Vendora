using System;

namespace Vendora.Infrastructure.Helpers
{
    [Flags]
    public enum QueryType
    {
        // fragment
        Result              = 0x0001,
        NotDeleted          = 0x0002,

        // basic query
        Select              = 0x0100 | Result,
        SelectById          = Select | 0x0010,
        SelectNotDeleted    = Select | NotDeleted,

        Insert              = 0x0200,

        Update              = 0x0400,
        UpdateById          = Update | 0x0010,

        // other types
        None                = 0x0000,
        All                 = 0xFFFF,
    }
}
