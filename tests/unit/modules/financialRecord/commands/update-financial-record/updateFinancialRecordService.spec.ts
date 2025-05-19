import { UpdateFinancialRecordService } from '@modules/financialRecord/commands/update-financial-record/updateFinancialRecordService';
import { UpdateFinancialRecordCommand } from '@modules/financialRecord/commands/update-financial-record/updateFinancialRecordCommand';
import { TypeOrmFinancialRecordRepositoryAdapter } from '@modules/financialRecord/database/financialRecordRepository';
import { FinancialRecordEntity } from '@modules/financialRecord/domain/financialRecordEntity';
import { Money } from '@modules/financialRecord/domain/value-objects/moneyValueObject';

jest.mock('@libs/application/context/AppRequestContext', () => ({
    RequestContextService: {
        getRequestId: () => 'test-request-id',
    },
}));

describe('UpdateFinancialRecordService', () => {
    let service: UpdateFinancialRecordService;
    let mockRepo: jest.Mocked<TypeOrmFinancialRecordRepositoryAdapter>;

    beforeEach(() => {
        mockRepo = {
            findOneById: jest.fn(),
            transaction: jest.fn((cb) => cb({})),
            save: jest.fn(),
        } as any;

        service = new UpdateFinancialRecordService(mockRepo);
    });

    const fakeRecord = {
        id: '1',
        subsidiaryId: 1,
        subAccountId: 2,
        counterpartyId: 3,
        date: '2025-01-01',
        note: 'original note',
        money: new Money({
            currencyCode: 'TWD',
            exchangeRate: 1,
            amount: 1000,
            adjustedExchangeRate: 1,
            adjustedAmount: 1000,
            twdAmount: 1000,
            adjustedTwdAmount: 1000,
        }),
        voucher: {
            accrualVoucherNumber: 'A001',
            actualVoucherNumber: 'B001',
        },
        invoice: {
            invoiceNumber: 'INV001',
            uniformInvoiceNumber: 'UNI001',
            invoiceDate: '2025-01-01',
        },
        updateBasicInfo: jest.fn(),
        updateMoney: jest.fn(),
        updateInvoice: jest.fn(),
        updateVoucher: jest.fn(),
        addEvent: jest.fn(),
    } as unknown as FinancialRecordEntity;

    it('should update a financial record and emit an event', async () => {
        mockRepo.findOneById.mockResolvedValue(fakeRecord);

        const command = new UpdateFinancialRecordCommand({
            id: '1',
            subsidiaryId: 1,
            subAccountId: 2,
            counterpartyId: 3,
            date: '2025-01-01',
            currencyCode: 'TWD',
            note: 'updated note',
            metadata: { userId: 'tester', timestamp: Date.now() },
            changeReason: '更新備註',
        });

        const result = await service.execute(command);

        expect(mockRepo.findOneById).toHaveBeenCalledWith('1');
        expect(fakeRecord.updateBasicInfo).toHaveBeenCalled();
        expect(fakeRecord.addEvent).toHaveBeenCalled();
        expect(mockRepo.save).toHaveBeenCalledWith(fakeRecord, expect.anything());
        expect(result).toHaveProperty('note', 'original note');
    });

    it('should throw an error if record not found', async () => {
        mockRepo.findOneById.mockResolvedValue(null);

        const command = new UpdateFinancialRecordCommand({
            id: '999',
            subsidiaryId: 1,
            subAccountId: 2,
            counterpartyId: 3,
            date: '2025-01-01',
            currencyCode: 'TWD',
            note: 'any note',
            metadata: { userId: 'tester', timestamp: Date.now() },
            changeReason: '找不到資料',
        });

        await expect(service.execute(command)).rejects.toThrow(
            'FinancialRecord with id 999 not found',
        );
    });
});