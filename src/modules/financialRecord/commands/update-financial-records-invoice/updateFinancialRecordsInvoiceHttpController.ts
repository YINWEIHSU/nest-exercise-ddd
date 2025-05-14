import { Body, Controller, HttpStatus, Param, Patch } from '@nestjs/common';
import { routesV1 } from '@src/config/appRoutes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateFinancialRecordsInvoiceCommand } from './updateFinancialRecordsInvoiceCommand';
import { updateFinancialRecordsInvoiceRequestDto } from './updateFinancialRecordsInvoiceRequestDto';
import { FinancialRecordResponseDto } from '../../dtos/financialRecordResponseDto';
import { ApiErrorResponse } from '@src/libs/api/api-error.response';
import { CurrentUser } from '@src/libs/decorators/user.decorator';

@Controller(routesV1.version)
export class updateFinancialRecordsInvoiceHttpController {
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
  async update (
    @Body() body: updateFinancialRecordsInvoiceRequestDto,
    @CurrentUser() userId: string,
  ): Promise<Partial<updateFinancialRecordsInvoiceRequestDto>> {
    const command = new UpdateFinancialRecordsInvoiceCommand({
      ...body,
      metadata: {
        userId,
        timestamp: Date.now(),
      },
    });
    const result: Partial<updateFinancialRecordsInvoiceRequestDto> =
      await this.commandBus.execute(command);

    return result;
  }
}
