using Vendora.Application.Models;
using Vendora.Infrastructure.Mapping;

namespace Vendora.Infrastructure.EntityMaps
{
    public class ProfileMap : EntityMap<Profile>
    {
        public ProfileMap()
        {
            TableName = "profile";

            Map(x => x.Id)
                .IgnoreQueries(QueryType.Update);

            Map(x => x.AccountId)
                .ToColumn("account_id");

            Map(x => x.CreatedDate)
                .ToColumn("created_date")
                .IgnoreQueries(QueryType.Update);

            Map(x => x.UpdatedDate)
                .ToColumn("updated_date");
        }
    }
}
