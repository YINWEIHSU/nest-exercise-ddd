import { ApiProperty } from '@nestjs/swagger'
import { TypeOrmSubAccountEntity } from '../database/typeorm/typeOrmSubAccountEntity'
import { SubAccountResponseDto } from './SubAccountResponseDto'

export class SubAccountsResponseDto {
  constructor(entities: TypeOrmSubAccountEntity[]) {
    this.data = entities.map((entity) => new SubAccountResponseDto(entity))
  }

  @ApiProperty({
    type: [SubAccountResponseDto],
    description: 'List of sub accounts',
  })
  data: SubAccountResponseDto[]
}
