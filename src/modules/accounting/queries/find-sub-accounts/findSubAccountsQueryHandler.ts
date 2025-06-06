import { Nullable } from '@libs/types'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { SubAccountsResponseDto } from '../../dtos/subAccountsResponseDto'

export class FindSubAccountsQuery {
  constructor(props: FindSubAccountsQuery) {}
}

@QueryHandler(FindSubAccountsQuery)
export class FindSubAccountsQueryHandler
  implements
    IQueryHandler<FindSubAccountsQuery, Nullable<SubAccountsResponseDto>>
{
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  /**
   * In read model we don't need to execute
   * any business logic, so we can bypass
   * domain and repository layers completely
   * and execute query directly
   */
  async execute(
    query: FindSubAccountsQuery,
  ): Promise<Nullable<SubAccountsResponseDto>> {
    try {
      const queryBuilder = this.dataSource
        .createQueryBuilder()
        .select('sa.id', 'id')
        .addSelect('sa.name', 'name')
        .from('sub_accounts', 'sa')

      const items = await queryBuilder.getRawMany()

      return { data: items }
    } catch (error) {
      console.error('Error in execute:', error)
      throw error
    }
  }
}
