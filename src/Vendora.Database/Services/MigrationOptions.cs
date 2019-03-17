namespace Vendora.Database.Services
{
    public class MigrationOptions
    {
        public string Database { get; set; }
        public string Connection { get; set; }
        public string Charset { get; set; }
        public string Collect { get; set; }

        public string DatabaseConnection => $"{Connection}database={Database};";
    }
}
