import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'
import { CounterpartyType } from '@libs/enums/counterpartyEnums'

export class CounterpartiesByTypeRequestDto {
    @ApiProperty({
        example: CounterpartyType.DOMESTIC_COMPANY,
        enum: CounterpartyType,
        description: '對象類型',
    })
    @IsEnum(CounterpartyType)
    readonly type: CounterpartyType
}