import { Body, Controller, Get, HttpStatus, Query, Param } from '@nestjs/common';
import { routesV1 } from '@src/config/appRoutes';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FindFinancialRecordRequestDto } from './findFinancialRecordRequestDto';
import { FindFinancialRecordQuery } from './findFinancialRecordQueryHandler';
import { FinancialRecordResponseDto } from '../../dtos/financialRecordResponseDto';
import { TypeOrmFinancialRecordEntity } from '../../database/typeorm/typeOrmFinancialRecordEntity';

@Controller(routesV1.version)
export class FindFinancialRecordHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.financialRecord.getOne)
  @ApiOperation({ summary: 'Find Financial record by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FinancialRecordResponseDto,
  })
  async findFinancialRecord(
    @Param() params: FindFinancialRecordRequestDto,
  ): Promise<FinancialRecordResponseDto> {
    const query = new FindFinancialRecordQuery({
      id: params.id,
    });
    const financialRecord: TypeOrmFinancialRecordEntity =
      await this.queryBus.execute(query);

    return new FinancialRecordResponseDto(financialRecord);
  }
}
