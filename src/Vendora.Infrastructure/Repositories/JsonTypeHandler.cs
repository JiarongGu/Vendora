using Dapper;
using Newtonsoft.Json;
using System;
using System.Data;

namespace Vendora.Infrastructure.Repositories
{
    public class JsonTypeHandler : SqlMapper.ITypeHandler
    {
        public void SetValue(IDbDataParameter parameter, object value)
        {
            parameter.Value = JsonConvert.SerializeObject(value);
            if (parameter.Value.ToString() == JsonConvert.Null)
            {
                parameter.Value = DBNull.Value;
            }
        }

        public object Parse(Type destinationType, object value)
        {
            return JsonConvert.DeserializeObject(value as string, destinationType);
        }
    }
}
