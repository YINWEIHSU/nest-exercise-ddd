import { ApiProperty } from '@nestjs/swagger';
import {
  Min,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsString,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

class InvoiceInfoDto {
  @ApiProperty({
    example: 'FN12345555',
    description: '統一編號',
  })
  @IsString()
  @IsNotEmpty()
  uniformInvoiceNumber: string;

  @ApiProperty({
    example: '123123123125',
    description: '發票號碼',
  })
  @IsString()
  @IsNotEmpty()
  invoiceNumber: string;

  @ApiProperty({
    example: '2025-01-01',
    description: '發票日期',
  })
  @IsDateString()
  invoiceDate: string;
}

export class updateFinancialRecordsInvoiceRequestDto {
  @ApiProperty({
    example: [1, 2, 3],
    description: '要鎖定的財務記錄 ID 陣列',
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  financialRecordIds: string[];

  @ApiProperty({
    description: '發票資訊',
    type: InvoiceInfoDto,
  })
  @ValidateNested()
  @Type(() => InvoiceInfoDto)
  invoiceInfo: InvoiceInfoDto;
}