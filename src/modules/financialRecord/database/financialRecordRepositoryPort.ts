import { PaginatedQueryParams, RepositoryPort } from '@libs/ddd';
import { FinancialRecordEntity } from '../domain/financialRecordEntity';

export interface FindFinancialRecordsParams extends PaginatedQueryParams {
  readonly startDate: string;
  readonly endDate: string;
  readonly queryWord?: string;
  readonly applicationFormId?: string;
  readonly mainAccountId?: string;
  readonly subAccountId?: string;
  readonly subsidiaryId?: string;
  readonly hasUniformInvoice?: string;
}

export interface FinancialRecordSearchCondition {
  ids?: number[];
  startDate?: string;
  endDate?: string;
  queryWord?: string;
  applicationFormId?: number;
  mainAccountId?: number;
  subAccountId?: number;
  subsidiaryId?: number;
  hasUniformInvoice?: boolean;
}

export interface FinancialRecordRepositoryPort
  extends RepositoryPort<FinancialRecordEntity> {
  logChanges(
    financialRecordId: number,
    userId: number,
    oldValues: object,
    newValues: object,
    changeReason: string,
  ): Promise<void>;
}
