import { Mapper } from '@libs/ddd'
// import { MainAccountResponseDto } from './dtos/financialRecordResponseDto';
import { Injectable } from '@nestjs/common'
import { TypeOrmMainAccountEntity } from './database/typeorm/typeOrmMainAccountEntity'
import { MainAccountEntity } from './domain/mainAccountEntity'

/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */

@Injectable()
export class MainAccountMapper
  implements Mapper<MainAccountEntity, TypeOrmMainAccountEntity>
{
  toPersistence(entity: MainAccountEntity): TypeOrmMainAccountEntity {
    const copy = entity.getProps()
    const record: TypeOrmMainAccountEntity = {
      id: parseInt(copy.id),
      name: copy.name,
      is_enable: copy.isEnable,
      created_at: copy.createdAt,
      updated_at: copy.updatedAt,
      sub_accounts: [],
    }
    return record
  }

  toDomain(record: TypeOrmMainAccountEntity): MainAccountEntity {
    const entity = new MainAccountEntity({
      id: record.id.toString(),
      createdAt: record.created_at,
      updatedAt: record.updated_at,
      props: {
        name: record.name,
        isEnable: record.is_enable,
      },
    })
    return entity
  }
}
