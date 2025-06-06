import { Controller, Get, HttpStatus, Query } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { routesV1 } from '@src/config/appRoutes'
import { TypeOrmCounterpartyEntity } from '../../database/typeorm/typeOrmCounterpartyEntity'
import { CounterpartyResponseDto } from '../../dtos/counterpartyResponseDto'
import { CounterpartiesQuery } from './counterpartiesQueryHandler'
import { CounterpartiesByTypeRequestDto } from './counterpartiesRequestDto'

@Controller(routesV1.version)
export class CounterpartiesHttpController {
    constructor(private readonly queryBus: QueryBus) { }

    @Get(routesV1.counterparty.getList)
    @ApiOperation({ summary: 'counterparties list' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: CounterpartyResponseDto,
    })
    async counterparties(
        @Query() queryParams: CounterpartiesByTypeRequestDto,
    ): Promise<{ data: CounterpartyResponseDto[] }> {
        const query = new CounterpartiesQuery(queryParams.type)
        const counterparties: TypeOrmCounterpartyEntity[] =
            await this.queryBus.execute(query)
        const data = counterparties.map(
            (counterparty) => new CounterpartyResponseDto(counterparty),
        )
        return { data }
    }
}
