import { ApiProperty } from '@nestjs/swagger'
import { PaginatedResponseDto } from '@src/libs/api/paginated.response.base'
import { FinancialRecordDetailResponseDto } from './FinancialRecordDetailResponseDto'

export class FinancialRecordsPaginatedResponseDto extends PaginatedResponseDto<FinancialRecordDetailResponseDto> {
  @ApiProperty({ type: FinancialRecordDetailResponseDto, isArray: true })
  readonly data: readonly FinancialRecordDetailResponseDto[]

  constructor(props: PaginatedResponseDto<FinancialRecordDetailResponseDto>) {
    super(props)
    this.data = props.data
  }
}
