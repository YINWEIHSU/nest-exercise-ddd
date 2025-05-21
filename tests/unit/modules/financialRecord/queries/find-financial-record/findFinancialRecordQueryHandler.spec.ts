import { TypeOrmFinancialRecordRepositoryQueryAdapter } from '@modules/financialRecord/database/financialRecordQueryRepository'
import {
  FindFinancialRecordQuery,
  FindFinancialRecordQueryHandler,
} from '@modules/financialRecord/queries/find-financial-record/findFinancialRecordQueryHandler'

describe('FindFinancialRecordQueryHandler', () => {
  let handler: FindFinancialRecordQueryHandler
  let mockRepo: jest.Mocked<TypeOrmFinancialRecordRepositoryQueryAdapter>

  beforeEach(() => {
    mockRepo = {
      findOneById: jest.fn(),
    } as any

    handler = new FindFinancialRecordQueryHandler(mockRepo)
  })

  it('should return financial record when found', async () => {
    const fakeEntity = { id: '1', date: '2025-01-01' } as any
    mockRepo.findOneById.mockResolvedValue(fakeEntity)

    const query = new FindFinancialRecordQuery({ id: '1' })
    const result = await handler.execute(query)

    expect(mockRepo.findOneById).toHaveBeenCalledWith('1')
    expect(result).toBe(fakeEntity)
  })

  it('should return null when record not found', async () => {
    mockRepo.findOneById.mockResolvedValue(null)

    const query = new FindFinancialRecordQuery({ id: '999' })
    const result = await handler.execute(query)

    expect(mockRepo.findOneById).toHaveBeenCalledWith('999')
    expect(result).toBeNull()
  })
})
