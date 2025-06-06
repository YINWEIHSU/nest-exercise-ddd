import { RepositoryBase } from '@libs/db/sqlRepositoryBase'
import { CounterpartyEntity } from '@modules/counterparty/domain/counterpartyEntity'
import { CounterpartyMapper } from '@modules/counterparty/counterpartyMapper'
import { Injectable, Logger } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { DataSource, Repository } from 'typeorm'
import { TypeOrmCounterpartyEntity } from './typeorm/typeOrmCounterpartyEntity'
import { CounterpartyType } from '@libs/enums/counterpartyEnums'
import { FindOptionsWhere } from 'typeorm'

@Injectable()
export class TypeOrmCounterpartyRepositoryAdapter
  extends RepositoryBase<CounterpartyEntity, TypeOrmCounterpartyEntity> {
  private typeormRepository: Repository<TypeOrmCounterpartyEntity>
  constructor(
    dataSource: DataSource,
    mapper: CounterpartyMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(
      dataSource,
      mapper,
      eventEmitter,
      new Logger(TypeOrmCounterpartyRepositoryAdapter.name),
    )

    this.typeormRepository = dataSource.getRepository(
      TypeOrmCounterpartyEntity,
    )

  }

  // 實現抽象方法以提供 TypeORM Repository
  protected getRepository(): Repository<TypeOrmCounterpartyEntity> {
    return this.typeormRepository
  }

  protected getEntityTarget(): new () => TypeOrmCounterpartyEntity {
    return TypeOrmCounterpartyEntity
  }

  async isCounterpartyDuplicate(
    type: CounterpartyType,
    name: string,
    identityNumber?: string,
  ): Promise<boolean> {
    const whereClause: FindOptionsWhere<TypeOrmCounterpartyEntity> = { type, name }
    if (identityNumber) {
      whereClause.identity_number = identityNumber
    }
    const existing = await this.typeormRepository.findOne({ where: whereClause })
    return !!existing
  }
}
