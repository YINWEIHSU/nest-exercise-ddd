import { ApiProperty } from '@nestjs/swagger'
import { TypeOrmMainAccountEntity } from '../database/typeorm/typeOrmMainAccountEntity'
import { MainAccountResponseDto } from './MainAccountResponseDto'

export class MainAccountsResponseDto {
  constructor(entities: TypeOrmMainAccountEntity[]) {
    this.data = entities.map((entity) => new MainAccountResponseDto(entity))
  }

  @ApiProperty({
    type: [MainAccountResponseDto],
    description: 'List of main accounts',
  })
  data: MainAccountResponseDto[]
}
