import { ResponseBase } from '@libs/api/response.base'
import { ApiProperty } from '@nestjs/swagger'
import { TypeOrmSubAccountEntity } from '../database/typeorm/typeOrmSubAccountEntity'

export class SubAccountResponseDto extends ResponseBase {
  constructor(props: TypeOrmSubAccountEntity) {
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
    example: '雲計算成本',
    description: 'name this record',
  })
  name: string
}
