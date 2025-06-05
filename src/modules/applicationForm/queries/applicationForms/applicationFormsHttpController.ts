import { Controller, Get, HttpStatus, Query } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { routesV1 } from '@src/config/appRoutes'
import { TypeOrmApplicationFormEntity } from '../../database/typeorm/typeOrmApplicationFormEntity'
import { ApplicationFormResponseDto } from '../../dtos/applicationFormResponseDto'
import { ApplicationFormsQuery } from './applicationFormsQueryHandler'

@Controller(routesV1.version)
export class ApplicationFormsHttpController {
  constructor(private readonly queryBus: QueryBus) { }

  @Get(routesV1.applicationForm.getList)
  @ApiOperation({ summary: 'applicationForm list' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ApplicationFormResponseDto,
  })
  async applicationforms(): Promise<any> {
    const query = new ApplicationFormsQuery()
    console.log('query', query)
    const applicationForms: TypeOrmApplicationFormEntity[] =
      await this.queryBus.execute(query)
    console.log('applicationForms', applicationForms)
    const data = applicationForms.map(
      (applicationForm) => new ApplicationFormResponseDto(applicationForm),
    )
    return { data }
  }
}
