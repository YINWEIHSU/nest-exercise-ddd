import { ResponseBase } from '@libs/api/response.base'
import { ApiProperty } from '@nestjs/swagger'
import { TypeOrmMainAccountEntity } from '../database/typeorm/typeOrmMainAccountEntity'

export class MainAccountResponseDto extends ResponseBase {
  constructor(props: TypeOrmMainAccountEntity) {
    super(props)
    this.id = props.id
    this.name = props.name
  }

  @ApiProperty({
    example: 1,
    description: 'id of this record',
  })
  id: number

  @ApiProperty({
    example: '應收帳款',
    description: 'name this record',
  })
  name: string
}
