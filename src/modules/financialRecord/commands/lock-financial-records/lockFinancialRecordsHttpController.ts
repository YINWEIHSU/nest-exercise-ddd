import { Body, Controller, HttpStatus, Param, Patch } from '@nestjs/common';
import { routesV1 } from '@src/config/appRoutes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { LockFinancialRecordsCommand } from './lockFinancialRecordsCommand';
import { LockFinancialRecordsRequestDto } from './lockFinancialRecordsRequestDto';
import { FinancialRecordResponseDto } from '../../dtos/financialRecordResponseDto';
import { ApiErrorResponse } from '@src/libs/api/api-error.response';
import { CurrentUser } from '@src/libs/decorators/user.decorator';

@Controller(routesV1.version)
export class LockFinancialRecordsHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'lock financial records' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FinancialRecordResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Patch(routesV1.financialRecord.lock)
  async lock(
    @Body() body: LockFinancialRecordsRequestDto,
    @CurrentUser() userId: string,
  ): Promise<Partial<LockFinancialRecordsRequestDto>> {
    const command = new LockFinancialRecordsCommand({
      ...body,
      metadata: {
        userId,
        timestamp: Date.now(),
      },
    });
    const result: Partial<LockFinancialRecordsRequestDto> =
      await this.commandBus.execute(command);

    return result;
  }
}
