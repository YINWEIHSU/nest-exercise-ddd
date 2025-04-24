import { AggregateRoot, AggregateID } from '@libs/ddd';
import { Voucher, VoucherProps } from './value-objects/voucherValueObject';
import { Invoice, InvoiceProps } from './value-objects/invoiceValueObject';
import {
  FinancialRecordProps,
  CreateFinancialRecordProps,
} from './financialRecordTypes';
import { FinancialRecordCreatedDomainEvent } from './events/financialRecordCreatedDomainEvent';
import { InvoiceUpdatedDomainEvent } from './events/invoiceUpdatesDomainEvent';
import { VoucherUpdatedDomainEvent } from './events/voucherUpdatesDomainEvent';
import { FinancialRecordDeletedDomainEvent } from './events/financialRecordDeletedDomainEvent';
import { FinancialRecordLockedDomainEvent } from './events/financialRecordLockedDomainEvent';
import { randomUUID } from 'crypto';
import { TransactionType } from '@src/libs/enums/transactionTypeEnums';

export class FinancialRecordEntity extends AggregateRoot<FinancialRecordProps> {
  protected readonly _id: AggregateID;

  static create(create: CreateFinancialRecordProps): FinancialRecordEntity {
    const id = randomUUID();
    const props: FinancialRecordProps = {
      ...create,
      transactionType: TransactionType.EXPENSE,
      isLocked: false,
      isDeleted: false,
    };
    const financialRecord = new FinancialRecordEntity({ id, props });
    /* adding "FinancialRecordCreated" Domain Event that will be published
    eventually so an event handler somewhere may receive it and do an
    appropriate action. Multiple events can be added if needed. */
    financialRecord.addEvent(
      new FinancialRecordCreatedDomainEvent({
        aggregateId: id,
        subAccountId: props.subAccountId,
        subsidiaryId: props.subsidiaryId,
        counterpartyId: props.counterpartyId,
        date: props.date,
        note: props.note,
        ...props.money.unpack(),
      }),
    );
    return financialRecord;
  }

  /* You can create getters only for the properties that you need to
  access and leave the rest of the properties private to keep entity
  encapsulated. To get all entity properties (for saving it to a
  database or mapping a response) use .getProps() method
  defined in a EntityBase parent class */
  get id(): string {
    return this._id;
  }

  lock(): void {
    this.addEvent(
      new FinancialRecordLockedDomainEvent({
        aggregateId: this.id,
      }),
    );
  }

  delete(): void {
    this.addEvent(
      new FinancialRecordDeletedDomainEvent({
        aggregateId: this.id,
      }),
    );
  }

  /* Update method only changes properties that we allow, in this
   case only address. This prevents from illegal actions, 
   for example setting email from outside by doing something
   like user.email = otherEmail */
  updateInvoice(props: InvoiceProps): void {
    const newInvoice = new Invoice({
      ...this.props.invoice,
      ...props,
    } as InvoiceProps);
    this.props.invoice = newInvoice;
    this.addEvent(
      new InvoiceUpdatedDomainEvent({
        aggregateId: this.id,
        invoiceNumber: newInvoice.invoiceNumber,
        uniformInvoiceNumber: newInvoice.uniformInvoiceNumber,
        invoiceDate: newInvoice.invoiceDate,
      }),
    );
  }

  updateVoucher(props: VoucherProps): void {
    const newVoucher = new Voucher({
      ...this.props.voucher,
      ...props,
    } as VoucherProps);
    this.props.voucher = newVoucher;
    this.addEvent(
      new VoucherUpdatedDomainEvent({
        aggregateId: this.id,
        accrualVoucherNumber: newVoucher.accrualVoucherNumber,
        actualVoucherNumber: newVoucher.actualVoucherNumber,
      }),
    );
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
