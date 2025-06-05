import { QueryBase } from '@libs/ddd/query.base'
import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { TypeOrmSubsidiaryRepositoryQueryAdapter } from '../../database/subsidiaryQueryRepository'
import { TypeOrmSubsidiaryEntity } from '../../database/typeorm/typeOrmSubsidiaryEntity'
import { SUBSIDIARY_QUERY_REPOSITORY } from '../../subsidiaryDiTokens'

export class SubsidiariesQuery extends QueryBase {
  constructor() {
    super()
  }
}

@QueryHandler(SubsidiariesQuery)
export class SubsidiariesQueryHandler
  implements IQueryHandler<SubsidiariesQuery, TypeOrmSubsidiaryEntity[]>
{
  constructor(
    @Inject(SUBSIDIARY_QUERY_REPOSITORY)
    private readonly repository: TypeOrmSubsidiaryRepositoryQueryAdapter,
  ) {}

  /**
   * In read model we don't need to execute
   * any business logic, so we can bypass
   * domain and repository layers completely
   * and execute query directly
   */
  async execute(): Promise<TypeOrmSubsidiaryEntity[]> {
    const entities = await this.repository.findAll()
    return entities
  }
}
