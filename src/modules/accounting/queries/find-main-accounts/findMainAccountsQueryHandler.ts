import { Nullable } from '@libs/types'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { MainAccountsResponseDto } from '../../dtos/MainAccountsResponseDto'

export class FindMainAccountsQuery {
  constructor(props: FindMainAccountsQuery) {}
}

@QueryHandler(FindMainAccountsQuery)
export class FindMainAccountsQueryHandler
  implements
    IQueryHandler<FindMainAccountsQuery, Nullable<MainAccountsResponseDto>>
{
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  /**
   * In read model we don't need to execute
   * any business logic, so we can bypass
   * domain and repository layers completely
   * and execute query directly
   */
  async execute(
    query: FindMainAccountsQuery,
  ): Promise<Nullable<MainAccountsResponseDto>> {
    try {
      const queryBuilder = this.dataSource
        .createQueryBuilder()
        .select('ma.id', 'id')
        .addSelect('ma.name', 'name')
        .from('main_accounts', 'ma')

      const items = await queryBuilder.getRawMany()

      return { data: items }
    } catch (error) {
      console.error('Error in execute:', error)
      throw error
    }
  }
}
