import { ApiProperty } from '@nestjs/swagger'

export class IdResponse {
  constructor(id: number) {
    this.id = id
  }

  @ApiProperty({ example: 1 })
  readonly id: number
}
