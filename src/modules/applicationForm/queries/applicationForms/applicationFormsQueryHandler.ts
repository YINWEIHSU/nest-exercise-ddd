import { QueryBase } from '@libs/ddd/query.base'
import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { TypeOrmApplicationFormRepositoryQueryAdapter } from '../../database/applicationFormQueryRepository'
import { TypeOrmApplicationFormEntity } from '../../database/typeorm/typeOrmApplicationFormEntity'
import { APPLICATION_FORM_QUERY_REPOSITORY } from '../../applicationFormDiTokens'

export class ApplicationFormsQuery extends QueryBase {
  constructor() {
    super()
  }
}

@QueryHandler(ApplicationFormsQuery)
export class ApplicationFormsQueryHandler
  implements IQueryHandler<ApplicationFormsQuery, TypeOrmApplicationFormEntity[]> {
  constructor(
    @Inject(APPLICATION_FORM_QUERY_REPOSITORY)
    private readonly repository: TypeOrmApplicationFormRepositoryQueryAdapter,
  ) { }

  /**
   * In read model we don't need to execute
   * any business logic, so we can bypass
   * domain and repository layers completely
   * and execute query directly
   */
  async execute(): Promise<TypeOrmApplicationFormEntity[]> {
    const entities = await this.repository.findAll()
    return entities
  }
}
