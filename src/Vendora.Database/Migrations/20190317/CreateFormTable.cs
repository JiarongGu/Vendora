using FluentMigrator;

namespace Vendora.Database.Migrations._20190317
{
    [Migration(20190317135730)]
    public class CreateFormTable : Migration
    {
        private readonly string TableName = "form";

        public override void Down()
        {
            Delete.Table(TableName);
        }

        public override void Up()
        {
            Create.Table(TableName)
                .WithColumn("id").AsString(36).NotNullable().PrimaryKey()
                .WithColumn("name").AsString().NotNullable()
                .WithColumn("language_code").AsString(10).NotNullable()
                .WithColumn("metadata").AsCustom("JSON").Nullable()
                .WithColumn("created_date").AsDateTime().NotNullable()
                .WithColumn("updated_date").AsDateTime().NotNullable()
                .WithColumn("deleted_date").AsDateTime().Nullable();

            Create.Index("IX_form_name")
                .OnTable(TableName)
                .OnColumn("name").Ascending()
                .WithOptions().NonClustered();

            Create.Index("IX_form_language_code")
                .OnTable(TableName)
                .OnColumn("language_code").Ascending()
                .WithOptions().NonClustered();

            Create.Index("IX_form_name_language_code")
                .OnTable(TableName)
                .OnColumn("name").Ascending()
                .OnColumn("language_code").Ascending()
                .WithOptions().NonClustered();

            Create.UniqueConstraint("UX_from_name_language_code_deleted_date")
                .OnTable(TableName)
                .Columns("name", "language_code", "deleted_date");
        }
    }
}
