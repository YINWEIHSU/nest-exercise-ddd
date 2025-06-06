import { Mapper } from '@libs/ddd'
import { Injectable } from '@nestjs/common'
import { TypeOrmSubAccountEntity } from './database/typeorm/typeOrmSubAccountEntity'
import { SubAccountEntity } from './domain/subAccountEntity'

/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */

@Injectable()
export class SubAccountMapper
  implements Mapper<SubAccountEntity, TypeOrmSubAccountEntity>
{
  toPersistence(entity: SubAccountEntity): TypeOrmSubAccountEntity {
    const copy = entity.getProps()
    const record: TypeOrmSubAccountEntity = {
      id: parseInt(copy.id),
      name: copy.name,
      is_enable: copy.isEnable,
      main_account_id: copy.mainAccountId,
      application_form_id: copy.applicationFormId,
      is_debit: copy.isDebit,
      created_at: copy.createdAt,
      updated_at: copy.updatedAt,
    }
    return record
  }

  toDomain(record: TypeOrmSubAccountEntity): SubAccountEntity {
    const entity = new SubAccountEntity({
      id: record.id.toString(),
      createdAt: record.created_at,
      updatedAt: record.updated_at,
      props: {
        name: record.name,
        isEnable: record.is_enable,
        mainAccountId: record.main_account_id,
        applicationFormId: record.application_form_id,
        isDebit: record.is_debit,
      },
    })
    return entity
  }
}
