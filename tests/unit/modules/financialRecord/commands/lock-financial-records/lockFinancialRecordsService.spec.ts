import { LockFinancialRecordsService } from '@modules/financialRecord/commands/lock-financial-records/lockFinancialRecordsService';
import { LockFinancialRecordsCommand } from '@modules/financialRecord/commands/lock-financial-records/lockFinancialRecordsCommand';
import { TypeOrmFinancialRecordRepositoryAdapter } from '@modules/financialRecord/database/financialRecordRepository';
import { FinancialRecordEntity } from '@modules/financialRecord/domain/financialRecordEntity';

describe('LockFinancialRecordsService', () => {
    let service: LockFinancialRecordsService;
    let mockRepo: jest.Mocked<TypeOrmFinancialRecordRepositoryAdapter>;

    beforeEach(() => {
        mockRepo = {
            findByIds: jest.fn(),
            transaction: jest.fn((cb) => cb({})),
            batchSave: jest.fn(),
        } as any;

        service = new LockFinancialRecordsService(mockRepo);
    });

    it('should lock financial records and emit event', async () => {
        const mockEntities: FinancialRecordEntity[] = [
            {
                id: '1',
                isLocked: false,
                lock: jest.fn(),
                addEvent: jest.fn(),
            },
        ] as any;

        mockRepo.findByIds.mockResolvedValue(mockEntities);

        const command = new LockFinancialRecordsCommand({
            financialRecordIds: ['1'],
            metadata: { userId: 'test-user', timestamp: Date.now() },
        });

        const result = await service.execute(command);

        expect(mockRepo.findByIds).toHaveBeenCalledWith(['1']);
        expect(mockEntities[0].lock).toHaveBeenCalled();
        expect(mockEntities[0].addEvent).toHaveBeenCalled();
        expect(mockRepo.batchSave).toHaveBeenCalledWith(mockEntities, expect.anything());
        expect(result).toEqual({ message: '成功上鎖' });
    });

    it('should skip event if no financial records found', async () => {
        mockRepo.findByIds.mockResolvedValue([]);

        const command = new LockFinancialRecordsCommand({
            financialRecordIds: ['999'],
            metadata: { userId: 'test-user', timestamp: Date.now() },
        });

        const result = await service.execute(command);

        expect(mockRepo.findByIds).toHaveBeenCalledWith(['999']);
        expect(mockRepo.batchSave).not.toHaveBeenCalled();
        expect(result).toEqual({ message: '成功上鎖' });
    });
});