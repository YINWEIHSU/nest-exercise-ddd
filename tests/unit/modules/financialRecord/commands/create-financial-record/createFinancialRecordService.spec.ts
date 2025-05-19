import { CreateFinancialRecordService } from '@modules/financialRecord/commands/create-financial-record/createFinancialRecordService';
import { CreateFinancialRecordCommand } from '@modules/financialRecord/commands/create-financial-record/createFinancialRecordCommand';
import { TypeOrmFinancialRecordRepositoryAdapter } from '@modules/financialRecord/database/financialRecordRepository';
import { AggregateID } from '@libs/ddd';

describe('CreateFinancialRecordService', () => {
    let service: CreateFinancialRecordService;
    let mockRepo: jest.Mocked<TypeOrmFinancialRecordRepositoryAdapter>;

    beforeEach(() => {
        mockRepo = {
            insert: jest.fn().mockResolvedValue('mock-id'),
            transaction: jest.fn((cb) => cb({})),
        } as any;

        service = new CreateFinancialRecordService(mockRepo);
    });

    it('should create and save a financial record and return id', async () => {
        const command = new CreateFinancialRecordCommand({
            subsidiaryId: 1,
            subAccountId: 10,
            counterpartyId: 1,
            currencyCode: 'TWD',
            exchangeRate: 1,
            amount: 1000,
            twdAmount: 1000,
            note: '測試用紀錄',
            date: '2025-01-01',
            metadata: { userId: '999', timestamp: Date.now() },
        });

        const result = await service.execute(command);

        expect(mockRepo.transaction).toHaveBeenCalled();
        expect(mockRepo.insert).toHaveBeenCalled();
        expect(result).toBe('mock-id');
    });

    it('should throw if repository insert fails', async () => {
        mockRepo.insert.mockRejectedValue(new Error('insert failed'));

        const command = new CreateFinancialRecordCommand({
            subsidiaryId: 1,
            subAccountId: 10,
            counterpartyId: 1,
            currencyCode: 'TWD',
            exchangeRate: 1,
            amount: 1000,
            twdAmount: 1000,
            note: '測試用紀錄',
            date: '2025-01-01',
            metadata: { userId: '999', timestamp: Date.now() },
        });

        await expect(service.execute(command)).rejects.toThrow('insert failed');
    });
});