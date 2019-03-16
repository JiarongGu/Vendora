using BanBrick.Utils.DependencyInjection;

namespace Vendora.Infrastructure
{
    public class MongoDbOptions: IConfigurationDependency
    {
        public string ConnectionString { get; set; }

        public string DatabaseName { get; set; }
    }
}