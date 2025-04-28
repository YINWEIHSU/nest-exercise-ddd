import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { QueryBase } from '@libs/ddd/query.base';
import { TypeOrmFinancialRecordEntity } from '../../database/typeorm/typeOrmFinancialRecordEntity';
import { TypeOrmFinancialRecordRepositoryQueryAdapter } from '../../database/financialRecordQueryRepository';
import { FINANCIAL_RECORD_QUERY_REPOSITORY } from '../../financialRecordDiTokens';
import { Nullable } from '@libs/types';

export class FindFinancialRecordQuery extends QueryBase {
  readonly id: string;

  constructor(props: FindFinancialRecordQuery) {
    super();
    this.id = props.id;
  }
}

@QueryHandler(FindFinancialRecordQuery)
export class FindFinancialRecordQueryHandler
  implements
    IQueryHandler<
      FindFinancialRecordQuery,
      Nullable<TypeOrmFinancialRecordEntity>
    >
{
  constructor(
    @Inject(FINANCIAL_RECORD_QUERY_REPOSITORY)
    private readonly repository: TypeOrmFinancialRecordRepositoryQueryAdapter,
  ) {}

  /**
   * In read model we don't need to execute
   * any business logic, so we can bypass
   * domain and repository layers completely
   * and execute query directly
   */
  async execute(
    query: FindFinancialRecordQuery,
  ): Promise<Nullable<TypeOrmFinancialRecordEntity>> {
    const entity = await this.repository.findOneById(query.id);
    return entity;
  }
}
