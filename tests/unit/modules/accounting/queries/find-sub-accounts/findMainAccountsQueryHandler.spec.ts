// tests/unit/modules/mainAccount/queries/find-financial-records/findMainAccountsQueryHandler.spec.ts
import {
  FindMainAccountsQuery,
  FindMainAccountsQueryHandler,
} from '@modules/accounting/queries/find-main-accounts/findMainAccountsQueryHandler'
import { DataSource, SelectQueryBuilder } from 'typeorm'

describe('FindMainAccountsQueryHandler', () => {
  let handler: FindMainAccountsQueryHandler
  let mockQueryBuilder: jest.Mocked<SelectQueryBuilder<any>>
  let mockDataSource: Partial<DataSource>

  beforeEach(() => {
    mockQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      getRawMany: jest.fn(),
    } as any

    mockDataSource = {
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    }

    handler = new FindMainAccountsQueryHandler(mockDataSource as DataSource)
  })

  it('should return all main accounts', async () => {
    const query = new FindMainAccountsQuery({})
    mockQueryBuilder.getRawMany.mockResolvedValue([
      {
        id: 1,
        name: '應收賬戶',
        is_enable: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])

    const result = await handler.execute(query)
    expect(mockQueryBuilder.getRawMany).toHaveBeenCalled()
    expect(result).not.toBeNull()
    expect(result?.data.length).toBe(1)
  })
})
