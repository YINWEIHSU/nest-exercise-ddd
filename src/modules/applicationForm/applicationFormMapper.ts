import { Mapper } from '@libs/ddd'
import { Injectable } from '@nestjs/common'
import { TypeOrmApplicationFormEntity } from './database/typeorm/typeOrmApplicationFormEntity'
import { ApplicationFormEntity } from './domain/applicationFormEntity'

/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */

@Injectable()
export class ApplicationFormMapper
  implements Mapper<ApplicationFormEntity, TypeOrmApplicationFormEntity> {
  toPersistence(entity: ApplicationFormEntity): TypeOrmApplicationFormEntity {
    const copy = entity.getProps()
    const applicationForm: TypeOrmApplicationFormEntity = {
      id: parseInt(copy.id),
      name: copy.name,
      is_enable: copy.isEnable,
    }
    return applicationForm
  }

  toDomain(applicationForm: TypeOrmApplicationFormEntity): ApplicationFormEntity {
    const entity = new ApplicationFormEntity({
      id: applicationForm.id.toString(),
      props: {
        name: applicationForm.name,
        isEnable: applicationForm.is_enable,
      },
    })
    return entity
  }
}
