import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TypeOrmFinancialRecordEntity } from './typeorm/typeOrmFinancialRecordEntity';
import { Nullable } from '@libs/types';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmFinancialRecordRepositoryQueryAdapter {
  private repository: Repository<TypeOrmFinancialRecordEntity>;

  constructor(
    @InjectRepository(TypeOrmFinancialRecordEntity)
    repository: Repository<TypeOrmFinancialRecordEntity>,
  ) {
    this.repository = repository;
  }

  public async findOneById(
    id: string,
  ): Promise<Nullable<TypeOrmFinancialRecordEntity>> {
    const entity = await this.repository.findOne({
      where: { id: Number(id) },
    });
    return entity ? entity : null;
  }

  public async findAll(
    id: string,
  ): Promise<Nullable<TypeOrmFinancialRecordEntity>> {
    const entity = await this.repository.findOne({
      where: { id: Number(id) },
    });
    return entity ? entity : null;
  }
}
