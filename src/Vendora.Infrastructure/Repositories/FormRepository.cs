using Dapper;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
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
        private readonly string _queryLanguage;
        private readonly string _queryName;
        private readonly string _queryOrderByCreation;

        public FormRepository(IOptions<ConnectionStringsOptions> connectionStrings, IQueryGenerator queryGenerator)
            : base(connectionStrings.Value.Vendora)
        {
            _queryFactory = queryGenerator.GetFactory<Form>();

            _queryLanguage = _queryFactory.GetColumnProperty(" = @", nameof(Form.Language));
            _queryName = _queryFactory.GetColumnProperty(" = @", nameof(Form.Name));
            _queryOrderByCreation = $"ORDER BY {_queryFactory.GetColumn(nameof(Form.CreatedDate))}";

            SqlMapper.AddTypeHandler(typeof(FormMetadata), new JsonTypeHandler());
        }

        public async Task<Form> InsertAsync(Form form)
        {
            using (var connection = GetConnection())
            {
                await connection.QueryAsync(_queryFactory.GetQuery(QueryType.Insert), Form.New(form));
                return form;
            }
        }

        public async Task<Form> FetchAsync(Guid id)
        {
            using (var connection = GetConnection())
            {
                return await connection.QuerySingleOrDefaultAsync<Form>(_queryFactory.GetQuery(QueryType.SelectById), new { Id = id });
            }
        }
        
        public async Task<IEnumerable<Form>> FetchAsync(string name, string language, int skip, int take)
        {
            var query = $"{_queryFactory.GetQuery(QueryType.SelectNotDeleted)}";

            if (!string.IsNullOrEmpty(name))
                query += $" AND {_queryName}";

            if (!string.IsNullOrEmpty(language))
                query += $" AND {_queryLanguage}";

            query += $" {_queryOrderByCreation}";

            if (take > 0)
                query += " Limit @Skip, @Take";

            using (var connection = GetConnection())
            {
                return await connection.QueryAsync<Form>(query, new {
                    Name = name,
                    Language = language,
                    Skip = skip,
                    Take = take
                });
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
