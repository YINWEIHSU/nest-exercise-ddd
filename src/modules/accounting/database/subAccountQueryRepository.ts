import { Nullable } from '@libs/types'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TypeOrmSubAccountEntity } from './typeorm/TypeOrmSubAccountEntity'

@Injectable()
export class TypeOrmSubAccountRepositoryQueryAdapter {
  private repository: Repository<TypeOrmSubAccountEntity>

  constructor(
    @InjectRepository(TypeOrmSubAccountEntity)
    repository: Repository<TypeOrmSubAccountEntity>,
  ) {
    this.repository = repository
  }

  public async findAll(): Promise<Nullable<TypeOrmSubAccountEntity[]>> {
    const entities = await this.repository.find()

    return entities.length > 0 ? entities : null
  }
}
