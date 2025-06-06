import { Controller, Get, HttpStatus, Query } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { routesV1 } from '@src/config/appRoutes'
import { MainAccountsResponseDto } from '../../dtos/MainAccountsResponseDto'
import { FindMainAccountsQuery } from './findMainAccountsQueryHandler'
import { MainAccountsRequestDto } from './findMainAccountsRequestDto'

@Controller(routesV1.version)
export class FindMainAccountsHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.mainAccount.getList)
  @ApiOperation({ summary: 'Find all Main Accounts' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: MainAccountsResponseDto,
  })
  async findMainAccounts(): Promise<MainAccountsResponseDto> {
    const query = new FindMainAccountsQuery(new MainAccountsRequestDto())
    const mainAccounts: MainAccountsResponseDto =
      await this.queryBus.execute(query)

    return mainAccounts
  }
}
