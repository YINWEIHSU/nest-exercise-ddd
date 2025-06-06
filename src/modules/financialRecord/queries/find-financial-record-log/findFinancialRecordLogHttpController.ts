import { Controller, Get, HttpStatus, Param } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { routesV1 } from '@src/config/appRoutes'
import { FinancialRecordLogResponseDto } from '../../dtos/financialRecordLogResponseDto'
import { FindFinancialRecordLogQuery } from './findFinancialRecordLogQueryHandler'
import { FindFinancialRecordLogRequestDto } from './findFinancialRecordLogRequestDto'

@Controller(routesV1.version)
export class FindFinancialRecordLogHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.financialRecord.log)
  @ApiOperation({ summary: 'Find Financial record log by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FinancialRecordLogResponseDto,
  })
  async findFinancialRecordLog(
    @Param() params: FindFinancialRecordLogRequestDto,
  ): Promise<any> {
    const query = new FindFinancialRecordLogQuery({
      id: params.id,
    })
    const financialRecordLog: any = await this.queryBus.execute(query)
    return FinancialRecordLogResponseDto.buildResponse(
      financialRecordLog.logs,
      financialRecordLog.references,
    )
  }
}
