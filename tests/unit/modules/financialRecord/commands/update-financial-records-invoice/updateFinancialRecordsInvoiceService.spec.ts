import { UpdateFinancialRecordsInvoiceService } from '@modules/financialRecord/commands/update-financial-records-invoice/updateFinancialRecordsInvoiceService';
import { UpdateFinancialRecordsInvoiceCommand } from '@modules/financialRecord/commands/update-financial-records-invoice/updateFinancialRecordsInvoiceCommand';
import { TypeOrmFinancialRecordRepositoryAdapter } from '@modules/financialRecord/database/financialRecordRepository';
import { FinancialRecordEntity } from '@modules/financialRecord/domain/financialRecordEntity';

describe('UpdateFinancialRecordsInvoiceService', () => {
    let service: UpdateFinancialRecordsInvoiceService;
    let mockRepo: jest.Mocked<TypeOrmFinancialRecordRepositoryAdapter>;

    const fakeRecord = {
        id: '1',
        invoice: {
            invoiceNumber: 'INV001',
            uniformInvoiceNumber: 'UNI001',
            invoiceDate: '2025-01-01',
        },
        updateInvoice: jest.fn(),
        addEvent: jest.fn(),
    } as unknown as FinancialRecordEntity;

    beforeEach(() => {
        mockRepo = {
            findByIds: jest.fn(),
            transaction: jest.fn((cb) => cb({})),
            batchSave: jest.fn(),
        } as any;

        service = new UpdateFinancialRecordsInvoiceService(mockRepo);
    });

    it('should update invoice for records and emit event', async () => {
        mockRepo.findByIds.mockResolvedValue([fakeRecord]);

        const command = new UpdateFinancialRecordsInvoiceCommand({
            financialRecordIds: ['1'],
            invoiceInfo: {
                invoiceNumber: 'INV999',
                uniformInvoiceNumber: 'UNI999',
                invoiceDate: '2025-12-12',
            },
            metadata: {
                userId: 'tester',
                timestamp: Date.now(),
            },
        });

        const result = await service.execute(command);

        expect(mockRepo.findByIds).toHaveBeenCalledWith(['1']);
        expect(fakeRecord.updateInvoice).toHaveBeenCalledWith(command.invoiceInfo);
        expect(fakeRecord.addEvent).toHaveBeenCalled();
        expect(mockRepo.batchSave).toHaveBeenCalledWith([fakeRecord], expect.anything());
        expect(result).toEqual({ message: '成功更新發票資訊' });
    });

    it('should skip if no records found', async () => {
        mockRepo.findByIds.mockResolvedValue([]);

        const command = new UpdateFinancialRecordsInvoiceCommand({
            financialRecordIds: ['999'],
            invoiceInfo: {
                invoiceNumber: 'INV999',
                uniformInvoiceNumber: 'UNI999',
                invoiceDate: '2025-12-12',
            },
            metadata: {
                userId: 'tester',
                timestamp: Date.now(),
            },
        });

        const result = await service.execute(command);

        expect(result).toEqual({ message: '成功更新發票資訊' });
        expect(mockRepo.batchSave).not.toHaveBeenCalled();
        expect(mockRepo.transaction).not.toHaveBeenCalled();
    });
});