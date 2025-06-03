import { Invoice } from '@modules/financialRecord/domain/value-objects/invoiceValueObject'

describe('Invoice Value Object', () => {
  it('should store and expose invoice fields correctly', () => {
    const invoice = new Invoice({
      uniformInvoiceNumber: 'FN12345678',
      invoiceNumber: 'A123456789',
      invoiceDate: '2025-01-01',
    })

    expect(invoice.uniformInvoiceNumber).toBe('FN12345678')
    expect(invoice.invoiceNumber).toBe('A123456789')
    expect(invoice.invoiceDate).toBe('2025-01-01')
  })
})
