import { DeleteFinancialRecordsService } from '@modules/financialRecord/commands/delete-financial-records/deleteFinancialRecordsService';
import { DeleteFinancialRecordsCommand } from '@modules/financialRecord/commands/delete-financial-records/deleteFinancialRecordsCommand';
import { FinancialRecordEntity } from '@modules/financialRecord/domain/financialRecordEntity';
import { TypeOrmFinancialRecordRepositoryAdapter } from '@modules/financialRecord/database/financialRecordRepository';

describe('DeleteFinancialRecordsService', () => {
    let service: DeleteFinancialRecordsService;
    let mockRepo: jest.Mocked<TypeOrmFinancialRecordRepositoryAdapter>;

    beforeEach(() => {
        mockRepo = {
            findByIds: jest.fn(),
            transaction: jest.fn((cb) => cb({})),
            batchSave: jest.fn(),
        } as any;

        service = new DeleteFinancialRecordsService(mockRepo);
    });

    it('should delete financial records and emit event', async () => {
        const mockEntities: FinancialRecordEntity[] = [
            {
                id: '1',
                isDeleted: false,
                delete: jest.fn(),
                addEvent: jest.fn(),
            },
        ] as any;

        mockRepo.findByIds.mockResolvedValue(mockEntities);

        const command = new DeleteFinancialRecordsCommand({
            ids: ['1'],
            metadata: { userId: 'test-user', timestamp: Date.now() },
        });

        const result = await service.execute(command);

        expect(mockRepo.findByIds).toHaveBeenCalledWith(['1']);
        expect(mockEntities[0].delete).toHaveBeenCalled();
        expect(mockEntities[0].addEvent).toHaveBeenCalled();
        expect(mockRepo.batchSave).toHaveBeenCalledWith(mockEntities, expect.anything());
        expect(result).toEqual({ message: '成功刪除' });
    });

    it('should not emit event if no financial records found', async () => {
        mockRepo.findByIds.mockResolvedValue([]);

        const command = new DeleteFinancialRecordsCommand({
            ids: ['1'],
            metadata: { userId: 'test-user', timestamp: Date.now() },
        });

        const result = await service.execute(command);

        expect(mockRepo.findByIds).toHaveBeenCalledWith(['1']);
        expect(mockRepo.batchSave).not.toHaveBeenCalled();
        expect(result).toEqual({ message: '成功刪除' });
    });
});