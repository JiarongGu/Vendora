using Vendora.Application.Models.Entities;
using Vendora.Infrastructure.Helpers;

namespace Vendora.Infrastructure.EntityMaps
{
    public class FormMap: EntityMap<Form>
    {
        public FormMap() {
            Map(x => x.LanguageCode)
                .ToColumn("language_code");
        }
    }
}
