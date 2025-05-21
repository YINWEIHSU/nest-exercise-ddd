import { ApiProperty } from '@nestjs/swagger'
import { IsString, Matches, MaxLength } from 'class-validator'

export class FindFinancialRecordRequestDto {
  @ApiProperty({ example: '1', description: 'Id of financial record' })
  @MaxLength(10)
  @IsString()
  @Matches(/^[0-9]*$/)
  readonly id: string
}
