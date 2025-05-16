import { Body, Controller, Delete, HttpStatus, Param, Patch, Query } from '@nestjs/common';
import { routesV1 } from '@src/config/appRoutes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { DeleteFinancialRecordsCommand } from './deleteFinancialRecordsCommand';
import { DeleteFinancialRecordsRequestDto } from './deleteFinancialRecordsRequestDto';
import { FinancialRecordResponseDto } from '../../dtos/financialRecordResponseDto';
import { ApiErrorResponse } from '@src/libs/api/api-error.response';
import { CurrentUser } from '@src/libs/decorators/user.decorator';

@Controller(routesV1.version)
export class DeleteFinancialRecordsHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'delete financial records' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FinancialRecordResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Delete(routesV1.financialRecord.getList)
  async delete(
    @Query() queries: DeleteFinancialRecordsRequestDto,
    @CurrentUser() userId: string,
  ): Promise<object> {
    const ids = queries.ids.split(',');
    const command = new DeleteFinancialRecordsCommand({
      ids,
      metadata: {
        userId,
        timestamp: Date.now(),
      },
    });


    const result: Partial<DeleteFinancialRecordsRequestDto> =
      await this.commandBus.execute(command);
    return result;
  }
}
