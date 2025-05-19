import { Body, Controller, HttpStatus, Param, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { routesV1 } from '@src/config/appRoutes';
import { ApiErrorResponse } from '@src/libs/api/api-error.response';
import { CurrentUser } from '@src/libs/decorators/user.decorator';
import { FinancialRecordResponseDto } from '../../dtos/financialRecordResponseDto';
import { UpdateFinancialRecordsInvoiceCommand } from './updateFinancialRecordsInvoiceCommand';
import { UpdateFinancialRecordsInvoiceRequestDto } from './updateFinancialRecordsInvoiceRequestDto';

@Controller(routesV1.version)
export class UpdateFinancialRecordsInvoiceHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'update financial records invoice info' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FinancialRecordResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Patch(routesV1.financialRecord.invoice)
  async update(
    @Body() body: UpdateFinancialRecordsInvoiceRequestDto,
    @CurrentUser() userId: string,
  ): Promise<Partial<UpdateFinancialRecordsInvoiceRequestDto>> {
    const command = new UpdateFinancialRecordsInvoiceCommand({
      ...body,
      metadata: {
        userId,
        timestamp: Date.now(),
      },
    });
    const result: Partial<UpdateFinancialRecordsInvoiceRequestDto> =
      await this.commandBus.execute(command);

    return result;
  }
}
