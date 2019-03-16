using FluentMigrator.Runner.VersionTableInfo;
using System;
using System.Collections.Generic;
using System.Text;

namespace Vendora.Database.Services
{
    public class VersionTableMetaData : IVersionTableMetaData
    {
        public object ApplicationContext { get; set; }

        public bool OwnsSchema => false;

        public string SchemaName => "";

        public string TableName => "version_info";

        public string ColumnName => "version";

        public string DescriptionColumnName => "description";

        public string UniqueIndexName => "uc_version";

        public string AppliedOnColumnName => "applied_on";
    }
}
