import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { routesV1 } from '@src/config/appRoutes';
import { PaginatedResponseDto } from '@src/libs/api/paginated.response.base';
import { Paginated } from '@src/libs/ddd';
import { FinancialRecordDetailResponseDto } from '../../dtos/FinancialRecordDetailResponseDto';
import { FinancialRecordsPaginatedResponseDto } from '../../dtos/financialRecordPaginatedResponseDto.ts';
import { FindFinancialRecordsQuery } from './findFinancialRecordsQueryHandler';
import { PaginatedFinancialRecordsRequestDto } from './findFinancialRecordsRequestDto';

@Controller(routesV1.version)
export class FindFinancialRecordsHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.financialRecord.getList)
  @ApiOperation({ summary: 'Find Financial records by condition' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FinancialRecordsPaginatedResponseDto,
  })
  async findFinancialRecords(
    @Query() queryParams: PaginatedFinancialRecordsRequestDto,
  ): Promise<PaginatedResponseDto<FinancialRecordDetailResponseDto>> {
    const query = new FindFinancialRecordsQuery({
      startDate: queryParams.startDate,
      endDate: queryParams.endDate,
      queryWord: queryParams.queryWord,
      applicationFormId: queryParams.applicationFormId,
      mainAccountId: queryParams.mainAccountId,
      subAccountId: queryParams.subAccountId,
      subsidiaryId: queryParams.subsidiaryId,
      hasUniformInvoice: queryParams.hasUniformInvoice,
      currentPage: queryParams.currentPage,
      itemCounts: queryParams.itemCounts,
      ids: queryParams.ids,
      sortBy: queryParams.sortBy,
      order: queryParams.order,
    });
    const paginatedFinancialRecords: Paginated<FinancialRecordDetailResponseDto> =
      await this.queryBus.execute(query);

    return new FinancialRecordsPaginatedResponseDto({
      ...paginatedFinancialRecords,
      data: paginatedFinancialRecords.data,
    });
  }
}
