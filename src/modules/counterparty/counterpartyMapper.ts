import { Mapper } from '@libs/ddd'
import { Injectable } from '@nestjs/common'
import { TypeOrmCounterpartyEntity } from './database/typeorm/typeOrmCounterpartyEntity'
import { CounterpartyEntity } from './domain/counterpartyEntity'

/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */

@Injectable()
export class CounterpartyMapper
    implements Mapper<CounterpartyEntity, TypeOrmCounterpartyEntity> {
    toPersistence(entity: CounterpartyEntity): TypeOrmCounterpartyEntity {
        const copy = entity.getProps()
        const counterparty: TypeOrmCounterpartyEntity = {
            id: parseInt(copy.id),
            name: copy.name,
            is_enable: copy.isEnable,
            type: copy.type, // Make sure 'type' exists in copy
            identity_number: copy.identityNumber,
            address: copy.address,
            created_at: copy.createdAt ?? new Date(), // Provide a default if not present
            updated_at: copy.updatedAt ?? new Date(), // Provide a default if not present
        }
        return counterparty
    }

    toDomain(counterparty: TypeOrmCounterpartyEntity): CounterpartyEntity {
        const entity = new CounterpartyEntity({
            id: counterparty.id.toString(),
            props: {
                name: counterparty.name,
                isEnable: counterparty.is_enable,
                type: counterparty.type,
            },
        })
        return entity
    }
}
