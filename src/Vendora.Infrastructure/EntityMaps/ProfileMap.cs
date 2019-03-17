using Dapper.FluentMap.Mapping;
using Vendora.Application.Models;

namespace Vendora.Infrastructure.EntityMaps
{
    public class ProfileMap: EntityMap<Profile>
    {
        public ProfileMap() {
            Map(x => x.AccountId).ToColumn("account_id");
            Map(x => x.CreatedDate).ToColumn("created_date");
            Map(x => x.UpdatedDate).ToColumn("updated_date");
        }
    }
}
