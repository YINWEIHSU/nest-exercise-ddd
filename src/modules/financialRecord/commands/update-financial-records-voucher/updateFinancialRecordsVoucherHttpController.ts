import { Body, Controller, HttpStatus, Param, Patch } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { routesV1 } from '@src/config/appRoutes'
import { ApiErrorResponse } from '@src/libs/api/api-error.response'
import { CurrentUser } from '@src/libs/decorators/user.decorator'
import { FinancialRecordResponseDto } from '../../dtos/financialRecordResponseDto'
import { UpdateFinancialRecordsVoucherCommand } from './updateFinancialRecordsIVoucherCommand'
import { UpdateFinancialRecordsVoucherRequestDto } from './updateFinancialRecordsVoucherRequestDto'

@Controller(routesV1.version)
export class UpdateFinancialRecordsVoucherHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'update financial records voucher number' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FinancialRecordResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Patch(routesV1.financialRecord.voucher)
  async update(
    @Body() body: UpdateFinancialRecordsVoucherRequestDto,
    @CurrentUser() userId: string,
  ): Promise<Partial<UpdateFinancialRecordsVoucherRequestDto>> {
    const command = new UpdateFinancialRecordsVoucherCommand({
      ...body,
      metadata: {
        userId,
        timestamp: Date.now(),
      },
    })
    const result: Partial<UpdateFinancialRecordsVoucherRequestDto> =
      await this.commandBus.execute(command)

    return result
  }
}
