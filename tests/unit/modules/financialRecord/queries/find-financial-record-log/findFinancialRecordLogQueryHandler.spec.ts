import {
  FindFinancialRecordLogQuery,
  FindFinancialRecordLogQueryHandler,
} from '@modules/financialRecord/queries/find-financial-record-log/findFinancialRecordLogQueryHandler'
import { DataSource } from 'typeorm'

describe('FindFinancialRecordLogQueryHandler', () => {
  let handler: FindFinancialRecordLogQueryHandler
  let mockDataSource: Partial<DataSource>

  const mockLogs = [
    {
      id: 1,
      financial_record_id: 1,
      user_id: 10,
      old_values: '{}',
      new_values: '{}',
      change_reason: 'test reason',
      created_at: new Date(),
      user_name: 'Test User',
    },
  ]

  const mockReferenceData = [
    { id: 1, name: 'Name1' },
    { id: 2, name: 'Name2' },
  ]

  beforeEach(() => {
    const mockQueryBuilder: any = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue(mockLogs),
      from: jest.fn().mockReturnThis(),
    }

    const mockRefBuilder: any = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue(mockReferenceData),
    }

    mockDataSource = {
      getRepository: jest.fn().mockReturnValue({
        createQueryBuilder: () => mockQueryBuilder,
      }),
      createQueryBuilder: jest.fn().mockReturnValue(mockRefBuilder),
    }

    handler = new FindFinancialRecordLogQueryHandler(
      mockDataSource as DataSource,
    )
  })

  it('should return logs and reference maps', async () => {
    const query = new FindFinancialRecordLogQuery({ id: '1' })

    const result = await handler.execute(query)

    expect(result.logs).toEqual(mockLogs)
    expect(result.references.applicationFormMap).toEqual({
      1: 'Name1',
      2: 'Name2',
    })
    expect(result.references.counterpartyMap).toEqual({
      1: 'Name1',
      2: 'Name2',
    })
    expect(result.references.mainAccountMap).toEqual({ 1: 'Name1', 2: 'Name2' })
    expect(result.references.subAccountMap).toEqual({ 1: 'Name1', 2: 'Name2' })
    expect(result.references.subsidiaryMap).toEqual({ 1: 'Name1', 2: 'Name2' })
  })
})
