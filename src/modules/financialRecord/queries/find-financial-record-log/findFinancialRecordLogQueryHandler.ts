import { QueryBase } from '@libs/ddd/query.base'
import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { Nullable } from '@libs/types'
import { DataSource } from 'typeorm'
import { FinancialRecordLogWithUserName } from '../../domain/financialRecordTypes'

export class FindFinancialRecordLogQuery extends QueryBase {
  readonly id: string

  constructor(props: FindFinancialRecordLogQuery) {
    super()
    this.id = props.id
  }
}

@QueryHandler(FindFinancialRecordLogQuery)
export class FindFinancialRecordLogQueryHandler
  implements IQueryHandler<FindFinancialRecordLogQuery, Nullable<any[]>>
{
  constructor(
    @Inject()
    private readonly dataSource: DataSource,
  ) {}

  async execute(query: FindFinancialRecordLogQuery): Promise<any> {
    const logs: FinancialRecordLogWithUserName[] = await this.dataSource
      .getRepository('financial_records_log')
      .createQueryBuilder('frl')
      .select('frl.id', 'id')
      .addSelect('frl.financial_record_id', 'financial_record_id')
      .addSelect('frl.user_id', 'user_id')
      .addSelect('frl.old_values', 'old_values')
      .addSelect('frl.new_values', 'new_values')
      .addSelect('frl.change_reason', 'change_reason')
      .addSelect('frl.created_at', 'created_at')
      .where('frl.financial_record_id = :id', { id: query.id })
      .leftJoin(
        (qb) => qb.select('*').from('gspadmin.users', 'u'),
        'updater',
        'updater.id = frl.user_id',
      )
      .addSelect(
        "CONCAT(updater.firstname, ' ', updater.lastname)",
        'user_name',
      )
      .orderBy('frl.created_at', 'DESC')
      .getRawMany()
    //需要將logs裡values中的id轉換成對應的名稱,故需要查詢對應的資料表
    const [
      applicationForms,
      counterparties,
      mainAccounts,
      subAccounts,
      subsidiaries,
    ] = await Promise.all([
      this.dataSource
        .createQueryBuilder()
        .select(['af.id AS id', 'af.name AS name'])
        .from('application_forms', 'af')
        .getRawMany(),

      this.dataSource
        .createQueryBuilder()
        .select(['c.id AS id', 'c.name AS name'])
        .from('counterparties', 'c')
        .getRawMany(),

      this.dataSource
        .createQueryBuilder()
        .select(['m.id AS id', 'm.name AS name'])
        .from('main_accounts', 'm')
        .getRawMany(),

      this.dataSource
        .createQueryBuilder()
        .select(['s.id AS id', 's.name AS name'])
        .from('sub_accounts', 's')
        .getRawMany(),

      this.dataSource
        .createQueryBuilder()
        .select(['sub.id AS id', 'sub.name AS name'])
        .from('subsidiaries', 'sub')
        .getRawMany(),
    ])

    // 轉換成 { id: name } 的對應 Map,方便查詢
    const applicationFormMap = Object.fromEntries(
      applicationForms.map((i) => [i.id, i.name]),
    )
    const counterpartyMap = Object.fromEntries(
      counterparties.map((i) => [i.id, i.name]),
    )
    const mainAccountMap = Object.fromEntries(
      mainAccounts.map((i) => [i.id, i.name]),
    )
    const subAccountMap = Object.fromEntries(
      subAccounts.map((i) => [i.id, i.name]),
    )
    const subsidiaryMap = Object.fromEntries(
      subsidiaries.map((i) => [i.id, i.name]),
    )

    return {
      logs,
      references: {
        applicationFormMap,
        counterpartyMap,
        mainAccountMap,
        subAccountMap,
        subsidiaryMap,
      },
    }
  }
}
