import { Voucher } from '@modules/financialRecord/domain/value-objects/voucherValueObject';

describe('Voucher Value Object', () => {
    it('should store voucher numbers correctly', () => {
        const voucher = new Voucher({
            accrualVoucherNumber: '202401011234',
            actualVoucherNumber: '202401019999',
        });

        expect(voucher.accrualVoucherNumber).toBe('202401011234');
        expect(voucher.actualVoucherNumber).toBe('202401019999');
    });

    it('should allow only accrual voucher number and omit actual number', () => {
        const voucher = new Voucher({
            accrualVoucherNumber: 'AC123456',
        });

        expect(voucher.accrualVoucherNumber).toBe('AC123456');
        expect(voucher.actualVoucherNumber).toBeUndefined();
    });
});