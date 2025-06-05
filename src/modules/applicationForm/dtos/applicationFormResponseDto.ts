import { ApiProperty } from '@nestjs/swagger'
import { TypeOrmApplicationFormEntity } from '../database/typeorm/typeOrmApplicationFormEntity'

export class ApplicationFormResponseDto {
  constructor(entity: TypeOrmApplicationFormEntity) {
    this.id = entity.id
    this.name = entity.name
  }

  @ApiProperty({
    example: 1,
    description: 'The ID of the application form',
  })
  id: number

  @ApiProperty({
    example: '數據交易市集',
    description: 'The name of the application form',
  })
  name: string
}
