using FluentMigrator;
using System;
using System.Collections.Generic;
using System.Text;

namespace Vendora.Database.Migrations._20190317
{
    [Migration(20190317135634)]
    public class CreateProfileTable : Migration
    {
        private readonly string TableName = "profile";

        public override void Down()
        {
            Delete.Table(TableName);
        }

        public override void Up()
        {
            Create.Table(TableName)
                .WithColumn("id").AsString(36).NotNullable().PrimaryKey()
                .WithColumn("account_id").AsString(36).Nullable()
                .WithColumn("name").AsString().Nullable()
                .WithColumn("email").AsString().Nullable()
                .WithColumn("phone").AsString().Nullable()
                .WithColumn("created_date").AsDateTime().NotNullable()
                .WithColumn("updated_date").AsDateTime().NotNullable()
                .WithColumn("deleted_date").AsDateTime().Nullable();

            Create.Index("IX_profile_email")
                .OnTable(TableName)
                .OnColumn("email")
                .Ascending().WithOptions().NonClustered();

            Create.Index("IX_profile_account_id")
                .OnTable(TableName)
                .OnColumn("account_id")
                .Ascending().WithOptions().NonClustered();
        }
    }
}
