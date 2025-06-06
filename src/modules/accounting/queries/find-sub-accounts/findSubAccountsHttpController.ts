import { Controller, Get, HttpStatus, Query } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { routesV1 } from '@src/config/appRoutes'
import { SubAccountsResponseDto } from '../../dtos/SubAccountsResponseDto'
import { FindSubAccountsQuery } from './findSubAccountsQueryHandler'
import { SubAccountsRequestDto } from './findSubAccountsRequestDto'

@Controller(routesV1.version)
export class FindSubAccountsHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.subAccount.getList)
  @ApiOperation({ summary: 'Find all Sub Accounts' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SubAccountsResponseDto,
  })
  async findSubAccounts(): Promise<SubAccountsResponseDto> {
    const query = new FindSubAccountsQuery(new SubAccountsRequestDto())
    const mainAccounts: SubAccountsResponseDto =
      await this.queryBus.execute(query)

    return mainAccounts
  }
}
