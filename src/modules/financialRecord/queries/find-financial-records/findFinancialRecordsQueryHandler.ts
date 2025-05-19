import { Paginated } from '@libs/ddd';
import { PaginatedParams, PaginatedQueryBase } from '@libs/ddd/query.base';
import { Nullable } from '@libs/types';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { PaginatedResponseDto } from '@src/libs/api/paginated.response.base.js';
import { TransactionType } from '@src/libs/enums/transactionTypeEnums';
import * as dayjs from 'dayjs';
import { DataSource } from 'typeorm';
import { FinancialRecordDetailResponseDto } from '../../dtos/financialRecordDetailResponseDto';

interface FinancialRecordRawData {
  id: number;
  subsidiaryId: number;
  subsidiaryName: string;
  transactionType: TransactionType;
  counterpartyId: number;
  counterpartyName: string;
  identificationNumber: string;
  applicationFormName: string;
  counterpartyEntityType: string;
  registeredAddress: string;
  mainAccountId: number;
  mainAccountName: string;
  subAccountId: number;
  subAccountName: string;
  applicationFormId: number;
  date: string;
  currencyCode: string;
  exchangeRate: string;
  adjustedExchangeRate: string;
  amount: string;
  adjustedAmount: string;
  twdAmount: string;
  adjustedTwdAmount: string;
  accrualVoucherNumber: string;
  actualVoucherNumber: string;
  invoiceNumber: string;
  uniformInvoiceNumber: string;
  invoiceDate: string;
  note: string;
  isLocked: number;
  isDeleted: number;
  creatorId: number;
  creatorName: string;
  created_at: Date;
  updated_at: Date;
}

interface CountResult {
  count: string;
}

export class FindFinancialRecordsQuery extends PaginatedQueryBase {
  readonly startDate: string;
  readonly endDate: string;
  readonly queryWord?: string;
  readonly ids?: string;
  readonly applicationFormId?: string;
  readonly mainAccountId?: string;
  readonly subAccountId?: string;
  readonly subsidiaryId?: string;
  readonly hasUniformInvoice?: boolean;

  constructor(props: PaginatedParams<FindFinancialRecordsQuery>) {
    super(props);
    this.ids = props.ids;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.queryWord = props.queryWord;
    this.applicationFormId = props.applicationFormId;
    this.mainAccountId = props.mainAccountId;
    this.subAccountId = props.subAccountId;
    this.subsidiaryId = props.subsidiaryId;
    this.hasUniformInvoice = props.hasUniformInvoice;
  }
}

@QueryHandler(FindFinancialRecordsQuery)
export class FindFinancialRecordsQueryHandler
  implements
    IQueryHandler<
      FindFinancialRecordsQuery,
      Nullable<PaginatedResponseDto<FinancialRecordDetailResponseDto>>
    >
{
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  /**
   * In read model we don't need to execute
   * any business logic, so we can bypass
   * domain and repository layers completely
   * and execute query directly
   */
  async execute(
    query: FindFinancialRecordsQuery,
  ): Promise<Nullable<PaginatedResponseDto<FinancialRecordDetailResponseDto>>> {
    try {
      const queryBuilder = this.dataSource
        .createQueryBuilder()
        .select('fr.id', 'id')
        .addSelect('subsidiary.id', 'subsidiaryId')
        .addSelect('subsidiary.name', 'subsidiaryName')
        .addSelect('fr.transaction_type', 'transactionType')
        .addSelect('fr.counterparty_id', 'counterpartyId')
        .addSelect('counterparty.name', 'counterpartyName')
        .addSelect('counterparty.identity_number', 'identificationNumber')
        .addSelect('application_form.name', 'applicationFormName')
        .addSelect('counterparty.type', 'counterpartyEntityType')
        .addSelect('counterparty.address', 'registeredAddress')
        .addSelect('main_account.id', 'mainAccountId')
        .addSelect('main_account.name', 'mainAccountName')
        .addSelect('sub_account.id', 'subAccountId')
        .addSelect('sub_account.name', 'subAccountName')
        .addSelect('sub_account.application_form_id', 'applicationFormId')
        .addSelect("DATE_FORMAT(fr.date, '%Y-%m-%d')", 'date')
        .addSelect('fr.currency_code', 'currencyCode')
        .addSelect('fr.exchange_rate', 'exchangeRate')
        .addSelect('fr.adjusted_exchange_rate', 'adjustedExchangeRate')
        .addSelect('fr.amount', 'amount')
        .addSelect('fr.adjusted_amount', 'adjustedAmount')
        .addSelect('fr.TWD_amount', 'twdAmount')
        .addSelect('fr.adjusted_TWD_amount', 'adjustedTwdAmount')
        .addSelect('fr.accrual_voucher_number', 'accrualVoucherNumber')
        .addSelect('fr.actual_voucher_number', 'actualVoucherNumber')
        .addSelect('fr.invoice_number', 'invoiceNumber')
        .addSelect('fr.uniform_invoice_number', 'uniformInvoiceNumber')
        .addSelect("DATE_FORMAT(fr.invoice_date, '%Y-%m-%d')", 'invoiceDate')
        .addSelect('fr.note', 'note')
        .addSelect('fr.is_locked', 'isLocked')
        .addSelect('fr.creator_id', 'creatorId')
        .addSelect(
          "CONCAT(creator.firstname, ' ', creator.lastname)",
          'creatorName',
        )
        .addSelect('fr.created_at', 'created_at')
        .addSelect('fr.updated_at', 'updated_at')
        .from('financial_records', 'fr')
        .leftJoin(
          'sub_accounts',
          'sub_account',
          'sub_account.id = fr.sub_account_id',
        )
        .leftJoin(
          'main_accounts',
          'main_account',
          'main_account.id = sub_account.main_account_id',
        )
        .leftJoin(
          'subsidiaries',
          'subsidiary',
          'subsidiary.id = fr.subsidiary_id',
        )
        .leftJoin(
          'counterparties',
          'counterparty',
          'counterparty.id = fr.counterparty_id',
        )
        .leftJoin(
          'application_forms',
          'application_form',
          'application_form.id = sub_account.application_form_id',
        )
        .leftJoin(
          (qb) => qb.select('*').from('gspadmin.users', 'u'),
          'creator',
          'creator.id = fr.creator_id',
        )
        .where('fr.is_deleted = :is_deleted', { is_deleted: false });

      // 建立查詢條件
      if (query.ids && query.ids.length > 0) {
        queryBuilder.andWhere('fr.id IN (:...ids)', { ids: query.ids });
      }

      if (query.startDate && query.endDate) {
        queryBuilder.andWhere('DATE(fr.date) BETWEEN :startDate AND :endDate', {
          startDate: dayjs(query.startDate).format(),
          endDate: dayjs(query.endDate).format(),
        });
      }

      if (query.subAccountId) {
        queryBuilder.andWhere('fr.sub_account_id = :subAccountId', {
          subAccountId: query.subAccountId,
        });
      }

      if (query.subsidiaryId) {
        queryBuilder.andWhere('fr.subsidiary_id = :subsidiaryId', {
          subsidiaryId: query.subsidiaryId,
        });
      }

      if (query.hasUniformInvoice === true) {
        queryBuilder.andWhere('fr.invoice_date IS NOT NULL');
      } else if (query.hasUniformInvoice === false) {
        queryBuilder.andWhere('fr.invoice_date IS NULL');
      }

      if (query.mainAccountId) {
        queryBuilder.andWhere('sub_account.main_account_id = :mainAccountId', {
          mainAccountId: query.mainAccountId,
        });
      }

      if (query.applicationFormId) {
        queryBuilder.andWhere(
          'sub_account.application_form_id = :applicationFormId',
          { applicationFormId: query.applicationFormId },
        );
      }

      // 處理關鍵字搜尋
      if (query.queryWord && query.queryWord.trim() !== '') {
        const keyword = `%${query.queryWord.trim()}%`;
        queryBuilder.andWhere(
          `(
            fr.invoice_number LIKE :keyword OR
            fr.uniform_invoice_number LIKE :keyword OR
            fr.accrual_voucher_number LIKE :keyword OR
            fr.actual_voucher_number LIKE :keyword OR
            fr.note LIKE :keyword OR
            subsidiary.name LIKE :keyword OR
            main_account.name LIKE :keyword OR
            sub_account.name LIKE :keyword OR
            counterparty.name LIKE :keyword OR
            counterparty.identity_number LIKE :keyword OR
            counterparty.address LIKE :keyword OR
            application_form.name LIKE :keyword OR
            CONCAT(creator.firstname, ' ', creator.lastname) LIKE :keyword
          )`,
          { keyword },
        );
      }

      // 處理排序
      if (query.sortBy && query.order) {
        const snakeCaseSortBy = query.sortBy
          .replace(/([A-Z])/g, '_$1')
          .toLowerCase();
        let sortByRelation;
        if (snakeCaseSortBy === 'sub_account_name') {
          sortByRelation = 'sub_account.name';
        }
        if (snakeCaseSortBy === 'main_account_name') {
          sortByRelation = 'main_account.name';
        }
        if (snakeCaseSortBy === 'subsidiary_name') {
          sortByRelation = 'subsidiary.name';
        }
        if (snakeCaseSortBy === 'counterparty_name') {
          sortByRelation = 'counterparty.name';
        }
        if (snakeCaseSortBy === 'identification_number') {
          sortByRelation = 'counterparty.identity_number';
        }
        if (snakeCaseSortBy === 'registered_address') {
          sortByRelation = 'counterparty.address';
        }
        if (snakeCaseSortBy === 'counterparty_entity_type') {
          sortByRelation = 'counterparty.type';
        }
        if (snakeCaseSortBy === 'application_form_name') {
          sortByRelation = 'application_form.name';
        }
        if (snakeCaseSortBy === 'creator_name') {
          sortByRelation = 'creator.firstname';
        }
        if (sortByRelation) {
          queryBuilder.orderBy(
            `${sortByRelation}`,
            query.order.toUpperCase() as 'ASC' | 'DESC',
          );
        } else {
          queryBuilder.orderBy(
            `fr.${snakeCaseSortBy}`,
            query.order.toUpperCase() as 'ASC' | 'DESC',
          );
        }
      }

      // clone for創建計數查詢
      const countQueryBuilder = queryBuilder.clone();

      // 獲取總筆數
      const totalCount = await countQueryBuilder
        .select('COUNT(fr.id)', 'count')
        .getRawOne<CountResult>()
        .then((result) => {
          console.log('result', result);
          if (!result || !result.count) {
            return 0;
          }
          return parseInt(result.count, 10);
        });

      // 添加分頁
      if (query.currentPage && query.itemCounts) {
        queryBuilder
          .offset((query.currentPage - 1) * query.itemCounts)
          .limit(query.itemCounts);
      }

      const items = await queryBuilder.getRawMany<FinancialRecordRawData>();
      console.log('items', items);
      const convertedItems: FinancialRecordDetailResponseDto[] = items.map(
        (item) => {
          return new FinancialRecordDetailResponseDto({
            ...item,
            exchangeRate: parseFloat(item.exchangeRate),
            adjustedExchangeRate: parseFloat(item.adjustedExchangeRate),
            amount: parseFloat(item.amount),
            adjustedAmount: parseFloat(item.adjustedAmount),
            twdAmount: parseFloat(item.twdAmount),
            adjustedTwdAmount: parseFloat(item.adjustedTwdAmount),
            isLocked: item.isLocked === 1,
            isDeleted: item.isDeleted === 1,
          });
        },
      );

      // 返回分頁結果
      return new Paginated({
        data: convertedItems,
        count: totalCount,
        itemCounts: query.itemCounts,
        currentPage: query.currentPage,
      });
    } catch (error) {
      console.error('Error in execute:', error);
      throw error;
    }
  }
}
