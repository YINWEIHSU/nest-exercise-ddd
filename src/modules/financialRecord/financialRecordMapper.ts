import { Mapper } from '@libs/ddd';
import { Money } from './domain/value-objects/moneyValueObject';
import { Voucher } from './domain/value-objects/voucherValueObject';
import { Invoice } from './domain/value-objects/invoiceValueObject';
import { TypeOrmFinancialRecordEntity } from './database/typeorm/typeOrmFinancialRecordEntity';
import { FinancialRecordEntity } from './domain/financialRecordEntity';
// import { FinancialRecordResponseDto } from './dtos/financialRecordResponseDto';
import { Injectable } from '@nestjs/common';

/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */

@Injectable()
export class FinancialRecordMapper
  implements
    Mapper<
      FinancialRecordEntity,
      TypeOrmFinancialRecordEntity
      // FinancialRecordResponseDto
    >
{
  toPersistence(entity: FinancialRecordEntity): TypeOrmFinancialRecordEntity {
    const copy = entity.getProps();
    const record: TypeOrmFinancialRecordEntity = {
      id: parseInt(copy.id),
      subsidiary_id: parseInt(copy.subsidiaryId),
      transaction_type: copy.transactionType,
      counterparty_id: parseInt(copy.counterpartyId),
      sub_account_id: parseInt(copy.subAccountId),
      // main_account_id: parseInt(copy.mainAccountId),
      // application_form_id: parseInt(copy.applicationFormId),
      date: copy.date,
      currency_code: copy.money.currencyCode,
      exchange_rate: copy.money.exchangeRate,
      adjusted_exchange_rate: copy.money.adjustedExchangeRate,
      amount: copy.money.amount,
      adjusted_amount: copy.money.adjustedAmount,
      TWD_amount: copy.money.twdAmount,
      adjusted_TWD_amount: copy.money.adjustedTwdAmount,
      accrual_voucher_number: copy.voucher
        ? copy.voucher.accrualVoucherNumber
        : null,
      actual_voucher_number: copy.voucher
        ? copy.voucher.actualVoucherNumber
        : null,
      invoice_number: copy.invoice ? copy.invoice.invoiceNumber : null,
      uniform_invoice_number: copy.invoice
        ? copy.invoice.uniformInvoiceNumber
        : null,
      invoice_date: copy.invoice ? copy.invoice.invoiceDate : null,
      note: copy.note,
      is_locked: copy.isLocked,
      is_deleted: copy.isDeleted,
      creator_id: parseInt(copy.creatorId),
      created_at: copy.createdAt,
      updated_at: copy.updatedAt,
    };
    return record;
  }

  toDomain(record: TypeOrmFinancialRecordEntity): FinancialRecordEntity {
    const entity = new FinancialRecordEntity({
      id: record.id.toString(),
      createdAt: record.created_at,
      updatedAt: record.updated_at,
      props: {
        subsidiaryId: record.subsidiary_id.toString(),
        transactionType: record.transaction_type,
        counterpartyId: record.counterparty_id.toString(),
        subAccountId: record.sub_account_id.toString(),
        // mainAccountId: record.main_account_id?.toString(),
        // applicationFormId: record.application_form_id?.toString(),
        date: record.date,
        money: new Money({
          currencyCode: record.currency_code,
          exchangeRate: record.exchange_rate,
          adjustedExchangeRate: record.adjusted_exchange_rate,
          amount: record.amount,
          adjustedAmount: record.adjusted_amount,
          twdAmount: record.TWD_amount,
          adjustedTwdAmount: record.adjusted_TWD_amount,
        }),
        voucher: new Voucher({
          accrualVoucherNumber: record.accrual_voucher_number
            ? record.accrual_voucher_number
            : '',
          actualVoucherNumber: record.actual_voucher_number
            ? record.actual_voucher_number
            : '',
        }),
        invoice: new Invoice({
          invoiceNumber: record.invoice_number ? record.invoice_number : '',
          uniformInvoiceNumber: record.uniform_invoice_number
            ? record.uniform_invoice_number
            : '',
          invoiceDate: record.invoice_date ? record.invoice_date : '',
        }),
        note: record.note ? record.note : '',
        isLocked: record.is_locked,
        isDeleted: record.is_deleted,
        creatorId: record.creator_id.toString(),
      },
    });
    return entity;
  }

  // toResponse(entity: FinancialRecordEntity): FinancialRecordResponseDto {
  //   const props = entity.getProps();
  //   const response = new FinancialRecordResponseDto(entity);
  //   response.email = props.email;
  //   response.country = props.address.country;
  //   response.postalCode = props.address.postalCode;
  //   response.street = props.address.street;
  //   return response;
  // }

  /* ^ Data returned to the user is whitelisted to avoid leaks.
     If a new property is added, like password or a
     credit card number, it won't be returned
     unless you specifically allow this.
     (avoid blacklisting, which will return everything
      but blacklisted items, which can lead to a data leak).
  */
}
