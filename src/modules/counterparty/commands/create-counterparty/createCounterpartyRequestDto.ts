import { ApiProperty } from '@nestjs/swagger'
import {
  IsEnum,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator'
import { CounterpartyType } from '@libs/enums/counterpartyEnums'

export class CreateCounterpartyRequestDto {
  @ApiProperty({
    example: 'FOREIGN_PERSON',
    enum: CounterpartyType,
    description: '對象類型: DOMESTIC_COMPANY（國內公司）、DOMESTIC_PERSON（國內個人）、FOREIGN_COMPANY（國外公司）、FOREIGN_PERSON（國外個人）',
  })
  @IsEnum(CounterpartyType, { message: 'type 必須是合法的 CounterpartyType 類型' })
  readonly type: CounterpartyType

  @ApiProperty({
    example: '中華電信',
    description: '對象名稱',
  })
  @IsString()
  @MaxLength(100)
  readonly name: string

  @ApiProperty({
    example: '12345566',
    description: '統一編號或身份證號碼',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(8, 20)
  readonly identificationNumber?: string

  @ApiProperty({
    example: '台北市中山區1號',
    description: '註冊地址',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly registeredAddress?: string
}