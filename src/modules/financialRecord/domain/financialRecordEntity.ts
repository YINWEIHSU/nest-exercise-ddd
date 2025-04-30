import { AggregateRoot, AggregateID } from '@libs/ddd';
import { Voucher, VoucherProps } from './value-objects/voucherValueObject';
import { Invoice, InvoiceProps } from './value-objects/invoiceValueObject';
import {
  FinancialRecordProps,
  CreateFinancialRecordProps,
} from './financialRecordTypes';
import { FinancialRecordCreatedDomainEvent } from './events/financialRecordCreatedDomainEvent';
import { randomUUID } from 'crypto';
import { TransactionType } from '@src/libs/enums/transactionTypeEnums';
import { Money, MoneyProps } from './value-objects/moneyValueObject';
import { CreateEntityProps } from '@libs/ddd/entity.base';

export class FinancialRecordEntity extends AggregateRoot<FinancialRecordProps> {
  protected _id: AggregateID;

  constructor(props: CreateEntityProps<FinancialRecordProps>) {
    super(props);
    this._id = props.id;
  }

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

  get money(): Money {
    return this.props.money;
  }

  get voucher(): Voucher | undefined {
    return this.props.voucher;
  }

  get invoice(): Invoice | undefined {
    return this.props.invoice;
  }

  get subsidiaryId(): string {
    return this.props.subsidiaryId;
  }
  get subAccountId(): string {
    return this.props.subAccountId;
  }

  get counterpartyId(): string {
    return this.props.counterpartyId;
  }

  get date(): string {
    return this.props.date;
  }

  get note(): string {
    return this.props.note;
  }

  lock(): void {
    // this.addEvent(
    //   new FinancialRecordLockedDomainEvent({
    //     aggregateId: this.id,
    //   }),
    // );
  }

  delete(): void {
    // this.addEvent(
    //   new FinancialRecordDeletedDomainEvent({
    //     aggregateId: this.id,
    //   }),
    // );
  }

  updateBasicInfo(
    props: {
      subsidiaryId?: string;
      subAccountId?: string;
      counterpartyId?: string;
      date?: string;
      note?: string;
    } = {},
  ): void {
    this.props.subsidiaryId = props.subsidiaryId || this.props.subsidiaryId;
    this.props.subAccountId = props.subAccountId || this.props.subAccountId;
    this.props.counterpartyId =
      props.counterpartyId || this.props.counterpartyId;
    this.props.date = props.date || this.props.date;
    this.props.note = props.note || this.props.note;
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
    // this.addEvent(
    //   new InvoiceUpdatedDomainEvent({
    //     aggregateId: this.id,
    //     invoiceNumber: newInvoice.invoiceNumber as string,
    //     uniformInvoiceNumber: newInvoice.uniformInvoiceNumber as string,
    //     invoiceDate: newInvoice.invoiceDate as string,
    //   }),
    // );
  }

  updateVoucher(props: VoucherProps): void {
    const newVoucher = new Voucher({
      ...this.props.voucher,
      ...props,
    } as VoucherProps);
    this.props.voucher = newVoucher;
    // this.addEvent(
    //   new VoucherUpdatedDomainEvent({
    //     aggregateId: this.id,
    //     accrualVoucherNumber: newVoucher.accrualVoucherNumber as string,
    //     actualVoucherNumber: newVoucher.actualVoucherNumber as string,
    //   }),
    // );
  }

  updateMoney(props: MoneyProps): void {
    const newMoney = new Money({
      ...this.props.money,
      ...props,
    } as MoneyProps);
    this.props.money = newMoney;
    // this.addEvent(
    //   new MoneyUpdatedDomainEvent({
    //     aggregateId: this.id,
    //     currencyCode: newMoney.currencyCode,
    //     exchangeRate: newMoney.exchangeRate,
    //     adjustedExchangeRate: newMoney.adjustedExchangeRate,
    //     amount: newMoney.amount,
    //     adjustedAmount: newMoney.adjustedAmount,
    //     twdAmount: newMoney.twdAmount,
    //     adjustedTwdAmount: newMoney.adjustedTwdAmount,
    //   }),
    // );
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
