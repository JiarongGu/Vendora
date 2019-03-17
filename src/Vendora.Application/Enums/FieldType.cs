using System;

namespace Vendora.Application.Enums
{
    [Flags]
    public enum FieldType
    {
        Text        = 0x0001,
        Number      = 0x0002,
        Currency    = 0x0004,
        DateTime    = 0x0008,
        Select      = 0x000F,
        Check       = 0x0010,
        Email       = 0x0020,
        Phone       = 0x0040,

        Multiple    = 0x1000,
        Range       = 0x2000,
    }
}
