import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  IsString,
  Matches,
  IsOptional,
  IsBooleanString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginatedQueryRequestDto } from '@src/libs/api/paginated-query.request.dto';

export class PaginatedFinancialRecordsRequestDto extends PaginatedQueryRequestDto {
  @ApiProperty({ example: '2023-01-01', description: '查詢開始日期' })
  @MaxLength(10)
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  readonly startDate: string;

  @ApiProperty({ example: '2023-12-31', description: '查詢結束日期' })
  @MaxLength(10)
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  readonly endDate: string;

  @ApiProperty({ example: '發票', description: '查詢關鍵字', required: false })
  @IsOptional()
  @MaxLength(50)
  @IsString()
  readonly queryWord?: string;

  @ApiProperty({
    example: '1',
    description: '申請表單ID',
    required: false,
  })
  @IsOptional()
  @MaxLength(10)
  @IsString()
  @Matches(/^[0-9]*$/)
  readonly applicationFormId?: string;

  @ApiProperty({
    example: '1',
    description: '主科目ID',
    required: false,
  })
  @IsOptional()
  @MaxLength(10)
  @IsString()
  @Matches(/^[0-9]*$/)
  readonly mainAccountId?: string;

  @ApiProperty({
    example: '1',
    description: '子科目ID',
    required: false,
  })
  @IsOptional()
  @MaxLength(10)
  @IsString()
  @Matches(/^[0-9]*$/)
  readonly subAccountId?: string;

  @ApiProperty({
    example: '1',
    description: '子公司ID',
    required: false,
  })
  @IsOptional()
  @MaxLength(10)
  @IsString()
  @Matches(/^[0-9]*$/)
  readonly subsidiaryId?: string;

  @ApiProperty({
    example: true,
    description: '是否有統一發票',
    required: false,
  })
  @IsOptional()
  @IsBooleanString()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  readonly hasUniformInvoice?: boolean;

  @ApiProperty({
    example: '1,2,3',
    description: 'ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly ids?: string;

  @ApiProperty({
    example: 'date',
    description: '排序欄位',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly sortBy?: string = 'date';

  @ApiProperty({
    example: 'desc',
    description: '排序方向 (asc/desc)',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly order?: 'asc' | 'desc' = 'desc';
}
