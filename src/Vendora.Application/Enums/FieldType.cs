using System;

namespace Vendora.Application.Enums
{
    [Flags]
    public enum FieldType
    {
        // basic input
        Hidden      = 0x0000,
        CheckBox    = 0x0001,
        Radio       = 0x0002,
        Number      = 0x0004,
        Password    = 0x0008,
        Text        = 0x000F,
        File        = 0x0010,

        // select
        Select      = 0x0020,

        // text inputs
        Email       = 0x010F,
        Phone       = 0x020F,
        Currency    = 0x040F,
        DateTime    = 0x080F,

        // basic quntity type
        Multiple    = 0x1000,
        Range       = 0x2000,
    }
}
