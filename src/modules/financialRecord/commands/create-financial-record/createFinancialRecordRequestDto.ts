import { ApiProperty } from '@nestjs/swagger'
import {
  IsAlpha,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Matches,
  MaxLength,
  Min,
} from 'class-validator'

export class CreateFinancialRecordRequestDto {
  @ApiProperty({
    example: 1,
    description: 'Subsidiary Id relate with financial record',
  })
  @Min(1)
  @IsInt()
  readonly subsidiaryId: number

  @ApiProperty({ example: '1', description: 'Counterparty id' })
  @Min(1)
  @IsInt()
  readonly counterpartyId: number

  @ApiProperty({ example: '1', description: 'Sub account id' })
  @Min(1)
  @IsInt()
  readonly subAccountId: number

  @ApiProperty({ example: 'Grande Rue', description: 'Street' })
  @MaxLength(10)
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  readonly date: string

  @ApiProperty({
    example: 'USD',
    description: 'Currency code of this record',
  })
  @Length(3)
  @IsAlpha()
  readonly currencyCode: string

  @ApiProperty({ example: 0.33, description: 'Exchange rate' })
  @IsNumber()
  readonly exchangeRate: number

  @ApiProperty({ example: 10000, description: 'Amount' })
  @Min(0)
  @IsPositive()
  readonly amount: number

  @ApiProperty({ example: 10000, description: 'Amount' })
  @Min(0)
  @IsPositive()
  readonly twdAmount: number

  @ApiProperty({ example: 'something', description: ' Note' })
  @IsString()
  readonly note: string
}
