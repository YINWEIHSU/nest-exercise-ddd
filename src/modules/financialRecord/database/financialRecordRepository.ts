import { Injectable, Logger } from '@nestjs/common';
import { FinancialRecordRepositoryPort } from '@modules/financialRecord/database/financialRecordRepositoryPort';
import { TypeOrmFinancialRecordEntity } from './typeorm/typeOrmFinancialRecordEntity';
import { FinancialRecordEntity } from '@modules/financialRecord/domain/financialRecordEntity';
import { Nullable } from '@libs/types';
import { RepositoryPort } from '@libs/ddd';
import { FinancialRecordMapper } from '@modules/financialRecord/financialRecordMapper';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DataSource } from 'typeorm';
import { RepositoryBase } from '@libs/db/sqlRepositoryBase';

@Injectable()
export class TypeOrmUserRepositoryAdapter
  extends RepositoryBase<FinancialRecordEntity, TypeOrmFinancialRecordEntity>
  implements FinancialRecordRepositoryPort
{
  protected repository: RepositoryPort<FinancialRecordEntity>;
  constructor(
    dataSource: DataSource,
    mapper: FinancialRecordMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(
      dataSource,
      mapper,
      eventEmitter,
      new Logger(TypeOrmUserRepositoryAdapter.name),
    );
  }
  public async findOneById(
    id: string,
  ): Promise<Nullable<FinancialRecordEntity>> {
    const entity = await this.repository.findOneById(id);
    return entity ? this.mapper.toDomain(entity) : null;
  }
}
