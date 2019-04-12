using Dapper;
using Newtonsoft.Json;
using System.Data;

namespace Vendora.Infrastructure.Repositories
{
    public class DynamicTypeHandler : SqlMapper.TypeHandler<dynamic>
    {
        public override dynamic Parse(object value)
        {
            return JsonConvert.DeserializeObject(value.ToString());
        }

        public override void SetValue(IDbDataParameter parameter, dynamic value)
        {
            parameter.Value = JsonConvert.SerializeObject(value);
        }
    }
}
