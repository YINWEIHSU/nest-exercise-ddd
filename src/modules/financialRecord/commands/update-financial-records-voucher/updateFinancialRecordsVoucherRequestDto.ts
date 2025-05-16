import { ApiProperty } from '@nestjs/swagger';
import {
  Min,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

class VoucherNumberDto {
  @ApiProperty({
    example: '12345555555',
    description: '應計傳票號碼',
    required: false,
  })
  @IsOptional()
  @IsString()
  accrualVoucherNumber?: string;

  @ApiProperty({
    example: '23333333333',
    description: '實際傳票號碼',
    required: false,
  })
  @IsOptional()
  @IsString()
  actualVoucherNumber?: string;
}

export class UpdateFinancialRecordsVoucherRequestDto {
  @ApiProperty({
    example: [1, 2, 3],
    description: '要更新傳票號碼的財務記錄 ID 陣列',
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  financialRecordIds: string[];

  @ApiProperty({
    description: '傳票號碼資訊',
    type: VoucherNumberDto,
  })
  @ValidateNested()
  @Type(() => VoucherNumberDto)
  voucherNumber: VoucherNumberDto;
}