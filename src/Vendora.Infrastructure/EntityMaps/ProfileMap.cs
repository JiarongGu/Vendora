using Vendora.Application.Models.Entities;
using Vendora.Infrastructure.Helpers;

namespace Vendora.Infrastructure.EntityMaps
{
    public class ProfileMap : EntityMap<Profile>
    {
        public ProfileMap()
        {
            Map(x => x.AccountId)
                .ToColumn("account_id");
        }
    }
}
