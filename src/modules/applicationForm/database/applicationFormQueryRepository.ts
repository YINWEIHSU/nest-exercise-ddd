import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TypeOrmApplicationFormEntity } from './typeorm/typeOrmApplicationFormEntity'

@Injectable()
export class TypeOrmApplicationFormRepositoryQueryAdapter {
  private repository: Repository<TypeOrmApplicationFormEntity>

  constructor(
    @InjectRepository(TypeOrmApplicationFormEntity)
    repository: Repository<TypeOrmApplicationFormEntity>,
  ) {
    this.repository = repository
  }

  public async findAll(): Promise<TypeOrmApplicationFormEntity[]> {
    return await this.repository.find({
      where: {
        is_enable: true,
      },
    })
  }
}
