import { Body, Controller, HttpStatus, Param, Patch } from '@nestjs/common';
import { routesV1 } from '@src/config/appRoutes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateFinancialRecordCommand } from './updateFinancialRecordCommand';
import { UpdateFinancialRecordRequestDto } from './updateFinancialRecordRequestDto';
import { FinancialRecordResponseDto } from '../../dtos/financialRecordResponseDto';
import { ApiErrorResponse } from '@src/libs/api/api-error.response';
import { CurrentUser } from '@src/libs/decorators/user.decorator';

@Controller(routesV1.version)
export class UpdateFinancialRecordHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Update a financial record' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FinancialRecordResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Patch(routesV1.financialRecord.getOne)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateFinancialRecordRequestDto,
    @CurrentUser() userId: string,
  ): Promise<Partial<UpdateFinancialRecordRequestDto>> {
    const command = new UpdateFinancialRecordCommand({
      ...body,
      id,
      metadata: {
        userId,
        timestamp: Date.now(),
      },
    });
    const result: Partial<UpdateFinancialRecordRequestDto> =
      await this.commandBus.execute(command);

    // Deciding what to do with a Result (similar to Rust matching)
    // if Ok we return a response with an id
    // if Error decide what to do with it depending on its type
    return result;
  }
}
