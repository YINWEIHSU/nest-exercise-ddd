import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { routesV1 } from '@src/config/appRoutes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { CreateFinancialRecordCommand } from './createFinancialRecordCommand';
import { CreateFinancialRecordRequestDto } from './createFinancialRecordRequestDto';
import { IdResponse } from '@libs/api/id.response.dto';
import { AggregateID } from '@libs/ddd';
import { ApiErrorResponse } from '@src/libs/api/api-error.response';
import { CurrentUser } from '@src/libs/decorators/user.decorator';

@Controller(routesV1.version)
export class CreateFinancialRecordHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create a financial record' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.financialRecord.root)
  async create(
    @Body() body: CreateFinancialRecordRequestDto,
    @CurrentUser() userId: string,
  ): Promise<IdResponse> {
    const command = new CreateFinancialRecordCommand({
      ...body,
      metadata: {
        userId,
        timestamp: Date.now(),
      },
    });

    const result: AggregateID = await this.commandBus.execute(command);

    // Deciding what to do with a Result (similar to Rust matching)
    // if Ok we return a response with an id
    // if Error decide what to do with it depending on its type
    return new IdResponse(parseInt(result));
  }
}
