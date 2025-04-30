import { Injectable, Logger } from '@nestjs/common';
import { FinancialRecordRepositoryPort } from '@modules/financialRecord/database/financialRecordRepositoryPort';
import { TypeOrmFinancialRecordEntity } from './typeorm/typeOrmFinancialRecordEntity';
import { TypeOrmFinancialRecordLogEntity } from './typeorm/typeOrmFinancialRecordLogEntity';
import { FinancialRecordEntity } from '@modules/financialRecord/domain/financialRecordEntity';
import { FinancialRecordMapper } from '@modules/financialRecord/financialRecordMapper';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DataSource, Repository } from 'typeorm';
import { RepositoryBase } from '@libs/db/sqlRepositoryBase';

@Injectable()
export class TypeOrmFinancialRecordRepositoryAdapter
  extends RepositoryBase<FinancialRecordEntity, TypeOrmFinancialRecordEntity>
  implements FinancialRecordRepositoryPort
{
  private typeormRepository: Repository<TypeOrmFinancialRecordEntity>;
  private logRepository: Repository<TypeOrmFinancialRecordLogEntity>;

  constructor(
    dataSource: DataSource,
    mapper: FinancialRecordMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(
      dataSource,
      mapper,
      eventEmitter,
      new Logger(TypeOrmFinancialRecordRepositoryAdapter.name),
    );

    this.typeormRepository = dataSource.getRepository(
      TypeOrmFinancialRecordEntity,
    );
    this.logRepository = dataSource.getRepository(
      TypeOrmFinancialRecordLogEntity,
    );
  }

  // 實現抽象方法以提供 TypeORM Repository
  protected getRepository(): Repository<TypeOrmFinancialRecordEntity> {
    return this.typeormRepository;
  }

  protected getEntityTarget(): new () => TypeOrmFinancialRecordEntity {
    return TypeOrmFinancialRecordEntity;
  }

  public async logChanges(
    financialRecordId: number,
    userId: number,
    oldValues: object,
    newValues: object,
    changeReason: string,
  ): Promise<void> {
    const log = new TypeOrmFinancialRecordLogEntity();
    log.financial_record_id = financialRecordId;
    log.user_id = userId;
    log.old_values = oldValues;
    log.new_values = newValues;
    log.change_reason = changeReason;

    await this.logRepository.save(log);
  }
}
