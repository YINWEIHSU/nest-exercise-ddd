import { Money } from './value-objects/moneyValueObject';
import { Voucher } from './value-objects/voucherValueObject';
import { Invoice } from './value-objects/invoiceValueObject';
import { TransactionType } from '@src/libs/enums/transactionTypeEnums';

// All properties that a User has
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

// Properties that are needed for a user creation
export interface CreateFinancialRecordProps {
  subsidiaryId: string;
  subAccountId: string;
  counterpartyId: string;
  date: string;
  money: Money;
  note: string;
  creatorId: string;
}

export enum UserRoles {
  admin = 'admin',
  moderator = 'moderator',
  guest = 'guest',
}
