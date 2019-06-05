using FluentMigrator;
using Newtonsoft.Json;
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
            var enquiryFormCN = File.ReadAllText("Migrations/20190604/enqiryform_cn.json");

        }
    }
}
