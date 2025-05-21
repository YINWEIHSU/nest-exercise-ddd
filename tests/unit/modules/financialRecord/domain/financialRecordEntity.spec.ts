import { FinancialRecordEntity } from '@modules/financialRecord/domain/financialRecordEntity'
import { Money } from '@modules/financialRecord/domain/value-objects/moneyValueObject'

describe('FinancialRecordEntity', () => {
  const baseProps = {
    subsidiaryId: '1',
    subAccountId: '2',
    counterpartyId: '3',
    date: '2025-01-01',
    note: '測試用',
    money: new Money({
      currencyCode: 'TWD',
      exchangeRate: 1,
      amount: 100,
      adjustedExchangeRate: 1,
      adjustedAmount: 100,
      twdAmount: 100,
      adjustedTwdAmount: 100,
    }),
    creatorId: 'user-1',
  }

  it('should create with default transactionType, isLocked and isDeleted', () => {
    const record = FinancialRecordEntity.create(baseProps)

    expect(record.isLocked).toBe(false)
    expect(record.isDeleted).toBe(false)
    expect(record.money.amount).toBe(100)
  })

  it('should lock and delete correctly', () => {
    const record = FinancialRecordEntity.create(baseProps)

    record.lock()
    expect(record.isLocked).toBe(true)

    record.delete()
    expect(record.isDeleted).toBe(true)
  })

  it('should update basic info', () => {
    const record = FinancialRecordEntity.create(baseProps)

    record.updateBasicInfo({
      subsidiaryId: '99',
      note: '更新備註',
    })

    expect(record.subsidiaryId).toBe('99')
    expect(record.note).toBe('更新備註')
  })

  it('should update money info', () => {
    const record = FinancialRecordEntity.create(baseProps)

    record.updateMoney({
      amount: 500,
      adjustedAmount: 400,
      currencyCode: 'USD',
      exchangeRate: 1,
      adjustedExchangeRate: 1,
      twdAmount: 15000,
      adjustedTwdAmount: 12000,
    })

    expect(record.money.amount).toBe(500)
    expect(record.money.currencyCode).toBe('USD')
  })
})
