using System;
using System.Collections.Generic;
using System.Text;

namespace Vendora.Infrastructure.Repositories
{
    public static class ProfileRepositoryQueries
    {
        public static readonly string Table = "`profile`";
        public static readonly string Columns = "id, account_id, name, email, phone, created_date, updated_date";
        public static readonly string Properties = "@Id, @AccountId, @Name, @Email, @Phone, @CreatedDate, @UpdatedDate";

        public static readonly string Insert = $"INSERT INTO {Table} ({Columns}) VALUES ({Properties});";
        public static readonly string SelectById = $"SELECT * FROM {Table} WHERE id = @Id";
    }
}
