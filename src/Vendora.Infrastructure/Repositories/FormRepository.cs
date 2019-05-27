using Dapper;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;
using Vendora.Application.Models.Entities;
using Vendora.Application.Models.Options;
using Vendora.Application.Repositories;
using Vendora.Infrastructure.Helpers;

namespace Vendora.Infrastructure.Repositories
{
    public class FormRepository : DapperRepository, IFormRepository
    {
        private readonly IQueryFactory _queryFactory;
        private readonly string _queryNameLanguage;

        public FormRepository(IOptions<ConnectionStringsOptions> connectionStrings, IQueryGenerator queryGenerator)
            : base(connectionStrings.Value.Vendora)
        {
            _queryFactory = queryGenerator.GetFactory<Form>();

            _queryNameLanguage = $"{string.Join(" AND ", _queryFactory.GetColumnProperties(" = @", nameof(Form.Name), nameof(Form.LanguageCode)))}";
        }

        public async Task<Form> InsertAsync(Form form)
        {
            using (var connection = GetConnection())
            {
                await connection.QueryAsync(_queryFactory.GetQuery(QueryType.Insert), Form.New(form));
                return form;
            }
        }

        public async Task<Form> FetchByIdAsync(string id)
        {
            using (var connection = GetConnection())
            {
                return await connection.QueryFirstAsync<Form>(_queryFactory.GetQuery(QueryType.SelectById), new { Id = id });
            }
        }

        public async Task<Form> FetchByNameAndLanguageAsync(string name, string language)
        {
            using (var connection = GetConnection())
            {
                return await connection.QuerySingleOrDefaultAsync<Form>(
                    $"{_queryFactory.GetQuery(QueryType.SelectNotDeleted)} AND {_queryNameLanguage}",
                    new { Name = name, LanguageCode = language }
                );
            }
        }

        public async Task<Form> UpdateAsync(Form form)
        {
            using (var connection = GetConnection())
            {
                var recordsAffected = await connection.ExecuteAsync(_queryFactory.GetQuery(QueryType.UpdateById), Form.Update(form));

                if (recordsAffected != 1)
                    throw new Exception($"Problem occurred while updating profile with Id {form.Id}");

                return form;
            }
        }
    }
}
