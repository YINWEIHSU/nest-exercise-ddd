import { ApiProperty } from '@nestjs/swagger'
import { TypeOrmSubsidiaryEntity } from '../database/typeorm/typeOrmSubsidiaryEntity'

export class SubsidiaryResponseDto {
    constructor(entity: TypeOrmSubsidiaryEntity) {
        this.id = entity.id
        this.name = entity.name
    }

    @ApiProperty({
        example: 1,
        description: 'The ID of the subsidiary',
    })
    id: number

    @ApiProperty({
        example: '果實夥伴股份有限公司',
        description: 'The name of the subsidiary',
    })
    name: string
}
