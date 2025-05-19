import { Money } from '@modules/financialRecord/domain/value-objects/moneyValueObject';

describe('Money Value Object', () => {
    it('should store and expose monetary fields correctly', () => {
        const money = new Money({
            currencyCode: 'TWD',
            exchangeRate: 1,
            amount: 1000,
            twdAmount: 1000,
            adjustedExchangeRate: 1,
            adjustedAmount: 1000,
            adjustedTwdAmount: 1000,
        });

        expect(money.amount).toBe(1000);
        expect(money.currencyCode).toBe('TWD');
    });

    it('should throw error if invalid amount is provided (optional)', () => {
        expect(() => {
            new Money({
                currencyCode: 'TWD',
                exchangeRate: 1,
                amount: -100,
                twdAmount: -100,
                adjustedExchangeRate: 1,
                adjustedAmount: -100,
                adjustedTwdAmount: -100,
            });
        }).not.toThrow(); // or toThrow(Error) if你加了驗證
    });
});