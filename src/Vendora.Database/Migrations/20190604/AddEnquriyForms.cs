using FluentMigrator;
using System;
using System.IO;

namespace Vendora.Database.Migrations._20190604
{
    [Migration(20190604194801)]
    public class AddEnquriyForms : Migration
    {
        public override void Down()
        {
            
        }

        public override void Up()
        {
            var formMetaCN = File.ReadAllText("Migrations/20190604/enquiryform_cn.json");
            var formMetaEN = File.ReadAllText("Migrations/20190604/enquiryform_en.json");

            Insert.IntoTable("form").Row(GetForm("cn", formMetaCN));
            Insert.IntoTable("form").Row(GetForm("en", formMetaEN));
        }

        private object GetForm(string language, string metadata) {
            var createdDate = DateTime.UtcNow;
            return new {
                id = Guid.NewGuid().ToString(),
                name = "basic-enquiry",
                language_code = language,
                metadata,
                created_date = createdDate,
                updated_date = createdDate
            };
        }
    }
}
