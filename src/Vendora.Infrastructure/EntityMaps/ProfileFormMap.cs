using Vendora.Application.Models.Entities;
using Vendora.Infrastructure.Helpers;

namespace Vendora.Infrastructure.EntityMaps
{
    public class ProfileFormMap: EntityMap<ProfileForm>
    {
        public ProfileFormMap() {
            Map(x => x.FormSnapshot)
                .ToColumn("form_snapshot");

            Map(x => x.FormData)
                .ToColumn("form_data");

            Map(x => x.ProfileId)
                .ToColumn("profile_id");
        }
    }
}
