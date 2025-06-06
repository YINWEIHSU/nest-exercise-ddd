import { ApiProperty } from '@nestjs/swagger'
import { TypeOrmCounterpartyEntity } from '../database/typeorm/typeOrmCounterpartyEntity'

export class CounterpartyResponseDto {
    constructor(entity: TypeOrmCounterpartyEntity) {
        this.id = entity.id
        this.name = entity.name
    }

    @ApiProperty({
        example: 1,
        description: 'The ID of the counterparty',
    })
    id: number

    @ApiProperty({
        example: '遊戲橘子股份有限公司',
        description: 'The name of the counterparty',
    })
    name: string
}
