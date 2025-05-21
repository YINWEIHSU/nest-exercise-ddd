import { Paginated } from '@libs/ddd'
// tests/unit/modules/financialRecord/queries/find-financial-records/findFinancialRecordsQueryHandler.spec.ts
import {
  FindFinancialRecordsQuery,
  FindFinancialRecordsQueryHandler,
} from '@modules/financialRecord/queries/find-financial-records/findFinancialRecordsQueryHandler'
import { DataSource, SelectQueryBuilder } from 'typeorm'

describe('FindFinancialRecordsQueryHandler', () => {
  let handler: FindFinancialRecordsQueryHandler
  let mockQueryBuilder: jest.Mocked<SelectQueryBuilder<any>>
  let mockDataSource: Partial<DataSource>

  beforeEach(() => {
    mockQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      getRawOne: jest.fn(),
      getRawMany: jest.fn(),
      clone: jest.fn().mockReturnThis(),
    } as any

    mockDataSource = {
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    }

    handler = new FindFinancialRecordsQueryHandler(mockDataSource as DataSource)
  })

  it('should return paginated financial records', async () => {
    const query = new FindFinancialRecordsQuery({
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      currentPage: 1,
      itemCounts: 10,
    })

    mockQueryBuilder.getRawOne.mockResolvedValue({ count: '2' })
    mockQueryBuilder.getRawMany.mockResolvedValue([
      {
        id: 1,
        subsidiaryId: 1,
        subsidiaryName: '子公司A',
        transactionType: 'INCOME',
        counterpartyId: 2,
        counterpartyName: '客戶X',
        identificationNumber: 'ABC123456',
        applicationFormName: '表單A',
        counterpartyEntityType: 'PERSON',
        registeredAddress: '地址',
        mainAccountId: 3,
        mainAccountName: '主科目',
        subAccountId: 4,
        subAccountName: '子科目',
        applicationFormId: 1,
        date: '2024-06-01',
        currencyCode: 'TWD',
        exchangeRate: '1.00',
        adjustedExchangeRate: '1.00',
        amount: '1000',
        adjustedAmount: '1000',
        twdAmount: '1000',
        adjustedTwdAmount: '1000',
        accrualVoucherNumber: 'A001',
        actualVoucherNumber: 'B001',
        invoiceNumber: 'INV001',
        uniformInvoiceNumber: 'UNI001',
        invoiceDate: '2024-06-02',
        note: '備註',
        isLocked: 1,
        isDeleted: 0,
        creatorId: 5,
        creatorName: '管理者',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])

    const result = await handler.execute(query)

    expect(result).toBeInstanceOf(Paginated)
    expect(mockQueryBuilder.getRawOne).toHaveBeenCalled()
    expect(mockQueryBuilder.getRawMany).toHaveBeenCalled()
    expect(result).not.toBeNull()
    expect(result?.data.length).toBe(1)
  })
})
