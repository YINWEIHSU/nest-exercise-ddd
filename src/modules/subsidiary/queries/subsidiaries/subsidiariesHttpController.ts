import { Controller, Get, HttpStatus, Query } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { routesV1 } from '@src/config/appRoutes'
import { TypeOrmSubsidiaryEntity } from '../../database/typeorm/typeOrmSubsidiaryEntity'
import { SubsidiaryResponseDto } from '../../dtos/subsidiaryResponseDto'
import { SubsidiariesQuery } from './subsidiariesQueryHandler'

@Controller(routesV1.version)
export class SubsidiariesHttpController {
    constructor(private readonly queryBus: QueryBus) { }

    @Get(routesV1.subsidiary.getList)
    @ApiOperation({ summary: 'subsidiares list' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: SubsidiaryResponseDto,
    })
    async subsidiaries(): Promise<any> {
        const query = new SubsidiariesQuery()
        const subsidiaries: TypeOrmSubsidiaryEntity[] =
            await this.queryBus.execute(query)
        const data = subsidiaries.map(
            (subsidiary) => new SubsidiaryResponseDto(subsidiary),
        )
        return { data }
    }
}
