using FluentMigrator;

namespace Vendora.Database.Migrations._20190317
{

    [Migration(20190317140759)]
    public class CreateProfileFormTable : Migration
    {
        private readonly string TableName = "profile_form";

        public override void Down()
        {
            Delete.Table(TableName);
        }

        public override void Up()
        {
            Create.Table(TableName)
                .WithColumn("id").AsString(36).NotNullable().PrimaryKey()
                .WithColumn("profile_id").AsString(36).NotNullable().ForeignKey("profile", "id")
                .WithColumn("form_id").AsString(36).NotNullable().ForeignKey("form", "id")
                .WithColumn("form_data").AsCustom("JSON").Nullable()
                .WithColumn("form_snapshot").AsCustom("JSON").Nullable()
                .WithColumn("created_date").AsDateTime().NotNullable()
                .WithColumn("updated_date").AsDateTime().NotNullable()
                .WithColumn("deleted_date").AsDateTime().Nullable();
        }
    }
}
