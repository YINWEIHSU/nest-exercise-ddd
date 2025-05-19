import { UpdateFinancialRecordsVoucherService } from '@modules/financialRecord/commands/update-financial-records-voucher/updateFinancialRecordsVoucherService';
import { UpdateFinancialRecordsVoucherCommand } from '@modules/financialRecord/commands/update-financial-records-voucher/updateFinancialRecordsIVoucherCommand';
import { TypeOrmFinancialRecordRepositoryAdapter } from '@modules/financialRecord/database/financialRecordRepository';
import { FinancialRecordEntity } from '@modules/financialRecord/domain/financialRecordEntity';

describe('UpdateFinancialRecordsVoucherService', () => {
    let service: UpdateFinancialRecordsVoucherService;
    let mockRepo: jest.Mocked<TypeOrmFinancialRecordRepositoryAdapter>;

    beforeEach(() => {
        mockRepo = {
            findByIds: jest.fn(),
            transaction: jest.fn((cb) => cb({})),
            batchSave: jest.fn(),
        } as any;

        service = new UpdateFinancialRecordsVoucherService(mockRepo);
    });

    it('should update voucher fields and emit event', async () => {
        const mockEntity = {
            id: '1',
            voucher: {
                accrualVoucherNumber: 'A0001',
                actualVoucherNumber: 'B0001',
            },
            updateVoucher: jest.fn(),
            addEvent: jest.fn(),
        } as unknown as FinancialRecordEntity;

        mockRepo.findByIds.mockResolvedValue([mockEntity]);

        const command = new UpdateFinancialRecordsVoucherCommand({
            financialRecordIds: ['1'],
            voucherNumber: {
                accrualVoucherNumber: 'A9999',
                actualVoucherNumber: 'B9999',
            },
            metadata: { userId: 'test-user', timestamp: Date.now() },
        });

        const result = await service.execute(command);

        expect(mockRepo.findByIds).toHaveBeenCalledWith(['1']);
        expect(mockEntity.updateVoucher).toHaveBeenCalledWith(command.voucherNumber);
        expect(mockEntity.addEvent).toHaveBeenCalled();
        expect(mockRepo.batchSave).toHaveBeenCalledWith([mockEntity], expect.anything());
        expect(result).toEqual({ message: '成功更新傳票資訊' });
    });

    it('should skip processing if no records found', async () => {
        mockRepo.findByIds.mockResolvedValue([]);

        const command = new UpdateFinancialRecordsVoucherCommand({
            financialRecordIds: ['1'],
            voucherNumber: {
                accrualVoucherNumber: 'A9999',
                actualVoucherNumber: 'B9999',
            },
            metadata: { userId: 'test-user', timestamp: Date.now() },
        });

        const result = await service.execute(command);

        expect(mockRepo.transaction).not.toHaveBeenCalled();
        expect(mockRepo.batchSave).not.toHaveBeenCalled();
        expect(result).toEqual({ message: '成功更新傳票資訊' });
    });
});