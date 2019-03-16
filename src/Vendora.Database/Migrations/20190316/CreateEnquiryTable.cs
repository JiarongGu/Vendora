using FluentMigrator;
using System;
using System.Collections.Generic;
using System.Text;

namespace Vendora.Database.Migrations._20190316
{
    [Migration(20190316225417)]
    public class CreateEnquiryTable : Migration
    {
        public override void Down()
        {
            throw new NotImplementedException();
        }

        public override void Up()
        {
            Create.Table("enquiry")
                .WithColumn("id").AsString(36).NotNullable().PrimaryKey()
                .WithColumn("type").AsString(50).NotNullable()
                .WithColumn("detail").AsCustom("JSON").Nullable();

            Create.Index("ix_enquiry_type")
                .OnTable("enquiry")
                .OnColumn("type")
                .Ascending().WithOptions().NonClustered();
        }
    }
}
