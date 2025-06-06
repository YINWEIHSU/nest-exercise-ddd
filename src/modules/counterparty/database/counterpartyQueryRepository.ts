import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TypeOrmCounterpartyEntity } from './typeorm/typeOrmCounterpartyEntity'
import { CounterpartyType } from '@libs/enums/counterpartyEnums'

@Injectable()
export class TypeOrmCounterpartyRepositoryQueryAdapter {
  private repository: Repository<TypeOrmCounterpartyEntity>

  constructor(
    @InjectRepository(TypeOrmCounterpartyEntity)
    repository: Repository<TypeOrmCounterpartyEntity>,
  ) {
    this.repository = repository
  }

  public async findAll(type: CounterpartyType): Promise<TypeOrmCounterpartyEntity[]> {
    const whereClause = { type, is_enable: true };
    return await this.repository.find({ where: whereClause })
  }
}
