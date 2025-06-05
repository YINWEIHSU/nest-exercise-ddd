import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TypeOrmSubsidiaryEntity } from './typeorm/typeOrmSubsidiaryEntity'

@Injectable()
export class TypeOrmSubsidiaryRepositoryQueryAdapter {
  private repository: Repository<TypeOrmSubsidiaryEntity>

  constructor(
    @InjectRepository(TypeOrmSubsidiaryEntity)
    repository: Repository<TypeOrmSubsidiaryEntity>,
  ) {
    this.repository = repository
  }

  public async findAll(): Promise<TypeOrmSubsidiaryEntity[]> {
    return await this.repository.find({
      where: {
        is_enable: true,
      },
    })
  }
}
