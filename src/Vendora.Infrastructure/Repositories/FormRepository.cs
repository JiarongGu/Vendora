using Dapper;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;
using Vendora.Application.Models.Entities;
using Vendora.Application.Repositories;
using Vendora.Infrastructure.Helpers;
using Vendora.Infrastructure.Models;

namespace Vendora.Infrastructure.Repositories
{
    public class FormRepository : DapperRepository, IFormRepository
    {
        private readonly Func<QueryType, string> _queryFactory;

        public FormRepository(IOptions<ConnectionStringsOptions> connectionStrings, IQueryGenerator queryGenerator)
            : base(connectionStrings.Value.Vendora)
        {
            _queryFactory = queryGenerator.GetFactory<Form>();
        }

        public async Task<Form> InsertAsync(Form form)
        {
            using (var connection = GetConnection())
            {
                await connection.QueryAsync(_queryFactory(QueryType.Insert), Form.New(form));
                return form;
            }
        }

        public async Task<Form> SelectByIdAsync(string id)
        {
            using (var connection = GetConnection())
            {
                return await connection.QueryFirstAsync<Form>(_queryFactory(QueryType.SelectById), new { Id = id });
            }
        }

        public async Task<Form> UpdateAsync(Form form)
        {
            using (var connection = GetConnection())
            {
                var recordsAffected = await connection.ExecuteAsync(_queryFactory(QueryType.UpdateById), Form.Update(form));

                if (recordsAffected != 1)
                    throw new Exception($"Problem occurred while updating profile with Id {form.Id}");

                return form;
            }
        }
    }
}
