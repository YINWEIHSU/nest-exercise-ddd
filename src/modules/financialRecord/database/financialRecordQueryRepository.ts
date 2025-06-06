import { Nullable } from '@libs/types'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TypeOrmFinancialRecordEntity } from './typeorm/typeOrmFinancialRecordEntity'

@Injectable()
export class TypeOrmFinancialRecordRepositoryQueryAdapter {
  private repository: Repository<TypeOrmFinancialRecordEntity>

  constructor(
    @InjectRepository(TypeOrmFinancialRecordEntity)
    repository: Repository<TypeOrmFinancialRecordEntity>,
  ) {
    this.repository = repository
  }

  public async findOneById(
    id: string,
  ): Promise<Nullable<TypeOrmFinancialRecordEntity>> {
    const entity = await this.repository.findOne({
      where: { id: Number(id) },
    })
    return entity ? entity : null
  }
}
