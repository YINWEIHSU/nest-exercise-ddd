// tests/unit/modules/accounting/queries/find-financial-records/findSubAccountsQueryHandler.spec.ts
import {
  FindSubAccountsQuery,
  FindSubAccountsQueryHandler,
} from '@modules/accounting/queries/find-sub-accounts/findSubAccountsQueryHandler'
import { MAIN_ACCOUNT_QUERY_REPOSITORY } from '@src/modules/accounting/accountingDiTokens'
import { mainModule } from 'process'
import { DataSource, SelectQueryBuilder } from 'typeorm'

describe('FindSubAccountsQueryHandler', () => {
  let handler: FindSubAccountsQueryHandler
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

    handler = new FindSubAccountsQueryHandler(mockDataSource as DataSource)
  })

  it('should return all sub accounts', async () => {
    const query = new FindSubAccountsQuery({})
    mockQueryBuilder.getRawMany.mockResolvedValue([
      {
        id: 1,
        name: '雲計算成本',
        main_account_id: 1,
        application_form_id: 1,
        is_debit: true,
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
