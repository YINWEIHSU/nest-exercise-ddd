import { QueryBase } from '@libs/ddd/query.base';
import { Nullable } from '@libs/types';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TypeOrmFinancialRecordRepositoryQueryAdapter } from '../../database/financialRecordQueryRepository';
import { TypeOrmFinancialRecordEntity } from '../../database/typeorm/typeOrmFinancialRecordEntity';
import { FINANCIAL_RECORD_QUERY_REPOSITORY } from '../../financialRecordDiTokens';

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
