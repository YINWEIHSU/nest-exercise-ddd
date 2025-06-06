import { QueryBase } from '@libs/ddd/query.base'
import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { TypeOrmCounterpartyRepositoryQueryAdapter } from '../../database/counterpartyQueryRepository'
import { TypeOrmCounterpartyEntity } from '../../database/typeorm/typeOrmCounterpartyEntity'
import { COUNTERPARTY_QUERY_REPOSITORY } from '../../counterpartyDiTokens'
import { CounterpartyType } from '@libs/enums/counterpartyEnums'

export class CounterpartiesQuery extends QueryBase {
  readonly type: CounterpartyType
  constructor(type: CounterpartyType) {
    super()
    this.type = type
  }
}

@QueryHandler(CounterpartiesQuery)
export class CounterpartiesQueryHandler
  implements IQueryHandler<CounterpartiesQuery, TypeOrmCounterpartyEntity[]> {
  constructor(
    @Inject(COUNTERPARTY_QUERY_REPOSITORY)
    private readonly repository: TypeOrmCounterpartyRepositoryQueryAdapter,
  ) { }

  /**
   * In read model we don't need to execute
   * any business logic, so we can bypass
   * domain and repository layers completely
   * and execute query directly
   */
  async execute(query: CounterpartiesQuery): Promise<TypeOrmCounterpartyEntity[]> {
    const { type } = query
    const entities = await this.repository.findAll(type)
    return entities
  }
}
