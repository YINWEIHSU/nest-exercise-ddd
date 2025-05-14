import { Body, Controller, HttpStatus, Param, Patch } from '@nestjs/common';
import { routesV1 } from '@src/config/appRoutes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { LockFinancialRecordCommand } from './lockFinancialRecordCommand';
import { LockFinancialRecordRequestDto } from './lockFinancialRecordRequestDto';
import { FinancialRecordResponseDto } from '../../dtos/financialRecordResponseDto';
import { ApiErrorResponse } from '@src/libs/api/api-error.response';
import { CurrentUser } from '@src/libs/decorators/user.decorator';

@Controller(routesV1.version)
export class LockFinancialRecordHttpController {
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
    @Body() body: LockFinancialRecordRequestDto,
    @CurrentUser() userId: string,
  ): Promise<Partial<LockFinancialRecordRequestDto>> {
    const command = new LockFinancialRecordCommand({
      ...body,
      metadata: {
        userId,
        timestamp: Date.now(),
      },
    });
    const result: Partial<LockFinancialRecordRequestDto> =
      await this.commandBus.execute(command);

    return result;
  }
}
