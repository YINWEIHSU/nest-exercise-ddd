import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@src/libs/api/paginated.response.base';
import { FinancialRecordResponseDto } from './financialRecordResponseDto';

export class FinancialRecordPaginatedResponseDto extends PaginatedResponseDto<FinancialRecordResponseDto> {
  @ApiProperty({ type: FinancialRecordResponseDto, isArray: true })
  readonly data: readonly FinancialRecordResponseDto[];
}
