import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsString, Matches } from 'class-validator'

export class DeleteFinancialRecordsRequestDto {
  @ApiProperty({
    example: '1,2,3',
    description: 'Comma-separated financial record ID strings',
    type: String,
  })
  @IsString({ each: true })
  @Matches(/^\d+$/, { each: true })
  readonly ids: string
}
