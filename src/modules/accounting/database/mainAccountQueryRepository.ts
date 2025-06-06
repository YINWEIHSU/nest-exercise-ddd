import { Nullable } from '@libs/types'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TypeOrmMainAccountEntity } from './typeorm/typeOrmMainAccountEntity'

@Injectable()
export class TypeOrmMainAccountRepositoryQueryAdapter {
  private repository: Repository<TypeOrmMainAccountEntity>

  constructor(
    @InjectRepository(TypeOrmMainAccountEntity)
    repository: Repository<TypeOrmMainAccountEntity>,
  ) {
    this.repository = repository
  }

  public async findAll(): Promise<Nullable<TypeOrmMainAccountEntity[]>> {
    const entities = await this.repository.find()

    return entities.length > 0 ? entities : null
  }
}
