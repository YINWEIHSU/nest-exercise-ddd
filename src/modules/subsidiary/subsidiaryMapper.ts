import { Mapper } from '@libs/ddd'
// import { SubsidiaryResponseDto } from './dtos/subsidiaryResponseDto';
import { Injectable } from '@nestjs/common'
import { TypeOrmSubsidiaryEntity } from './database/typeorm/typeOrmSubsidiaryEntity'
import { SubsidiaryEntity } from './domain/subsidiaryEntity'

/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */

@Injectable()
export class SubsidiaryMapper
  implements Mapper<SubsidiaryEntity, TypeOrmSubsidiaryEntity>
{
  toPersistence(entity: SubsidiaryEntity): TypeOrmSubsidiaryEntity {
    const copy = entity.getProps()
    const subsidiary: TypeOrmSubsidiaryEntity = {
      id: parseInt(copy.id),
      name: copy.name,
      is_enable: copy.isEnable,
      created_at: copy.createdAt,
      updated_at: copy.updatedAt,
    }
    return subsidiary
  }

  toDomain(subsidiary: TypeOrmSubsidiaryEntity): SubsidiaryEntity {
    const entity = new SubsidiaryEntity({
      id: subsidiary.id.toString(),
      createdAt: subsidiary.created_at,
      updatedAt: subsidiary.updated_at,
      props: {
        name: subsidiary.name,
        isEnable: subsidiary.is_enable,
      },
    })
    return entity
  }
}
