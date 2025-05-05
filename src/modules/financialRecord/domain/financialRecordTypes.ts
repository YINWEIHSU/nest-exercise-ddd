import { Money } from './value-objects/moneyValueObject';
import { Voucher } from './value-objects/voucherValueObject';
import { Invoice } from './value-objects/invoiceValueObject';
import { TransactionType } from '@src/libs/enums/transactionTypeEnums';

export interface FinancialRecordProps {
  subsidiaryId: string;
  transactionType: TransactionType;
  subAccountId: string;
  counterpartyId: string;
  date: string;
  money: Money;
  note: string;
  voucher?: Voucher;
  invoice?: Invoice;
  isLocked: boolean;
  isDeleted: boolean;
  creatorId: string;
}

export interface CreateFinancialRecordProps {
  id?: string;
  subsidiaryId: string;
  subAccountId: string;
  counterpartyId: string;
  date: string;
  money: Money;
  note: string;
  creatorId: string;
}
