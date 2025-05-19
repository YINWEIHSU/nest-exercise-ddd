import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { routesV1 } from '@src/config/appRoutes';
import { TypeOrmFinancialRecordEntity } from '../../database/typeorm/typeOrmFinancialRecordEntity';
import { FinancialRecordResponseDto } from '../../dtos/financialRecordResponseDto';
import { FindFinancialRecordQuery } from './findFinancialRecordQueryHandler';
import { FindFinancialRecordRequestDto } from './findFinancialRecordRequestDto';

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
