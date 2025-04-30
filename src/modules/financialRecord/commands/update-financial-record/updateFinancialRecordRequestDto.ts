import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsString,
  Min,
  IsOptional,
  IsInt,
  Length,
  IsAlpha,
  Matches,
  MaxLength,
} from 'class-validator';

export class UpdateFinancialRecordRequestDto {
  @ApiProperty({ example: 1, description: 'Financial record ID' })
  @IsString()
  readonly id: string;

  @ApiProperty({
    example: 1,
    description: 'Subsidiary Id relate with financial record',
  })
  @Min(1)
  @IsInt()
  @IsOptional()
  readonly subsidiaryId: number;

  @ApiProperty({ example: '1', description: 'Counterparty id' })
  @Min(1)
  @IsInt()
  @IsOptional()
  readonly counterpartyId: number;

  @ApiProperty({ example: '1', description: 'Sub account id' })
  @Min(1)
  @IsInt()
  @IsOptional()
  readonly subAccountId: number;

  @ApiProperty({ example: 'Grande Rue', description: 'Street' })
  @MaxLength(10)
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsOptional()
  readonly date: string;

  @ApiProperty({
    example: 'USD',
    description: 'Currency code of this record',
  })
  @Length(3)
  @IsAlpha()
  @IsOptional()
  readonly currencyCode: string;

  @ApiProperty({ example: 0.33, description: 'Exchange rate' })
  @IsNumber()
  @IsOptional()
  readonly exchangeRate: number;

  @ApiProperty({ example: 10000, description: 'Amount' })
  @Min(0)
  @IsPositive()
  @IsOptional()
  readonly amount: number;

  @ApiProperty({ example: 10000, description: 'Amount' })
  @Min(0)
  @IsPositive()
  @IsOptional()
  readonly twdAmount: number;

  @ApiProperty({ example: 'something', description: ' Note' })
  @IsString()
  @IsOptional()
  readonly note: string;

  @ApiProperty({ example: 0.33, description: 'Adjusted exchange rate' })
  @IsNumber()
  @IsOptional()
  readonly adjustedExchangeRate: number;

  @ApiProperty({ example: 10000, description: 'Adjusted Amount' })
  @Min(0)
  @IsPositive()
  @IsOptional()
  readonly adjustedAmount: number;

  @ApiProperty({ example: 10000, description: 'Adjusted  twd amount' })
  @Min(0)
  @IsPositive()
  @IsOptional()
  readonly adjustedTwdAmount: number;

  @ApiProperty({ example: 'FD123456', description: 'Accrual voucher number' })
  @IsString()
  @IsOptional()
  readonly accrualVoucherNumber: string;

  @ApiProperty({ example: 'FD123456', description: 'Actual voucher number' })
  @IsString()
  @IsOptional()
  readonly actualVoucherNumber: string;

  @ApiProperty({ example: 'FD123456', description: 'Invoice number' })
  @IsString()
  @IsOptional()
  readonly invoiceNumber: string;

  @ApiProperty({ example: 'FD123456', description: 'Uniform invoice number' })
  @IsString()
  @IsOptional()
  readonly uniformInvoiceNumber: string;

  @ApiProperty({ example: 'something', description: ' Note' })
  @IsString()
  readonly changeReason: string;
}
