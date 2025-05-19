import { TransactionType } from '@libs/enums/transactionTypeEnums'
import { ApiProperty } from '@nestjs/swagger'
import { IdResponse } from '@src/libs/api/id.response.dto'

export interface FinancialRecordDetailResponseDtoProps {
  id: number
  transactionType: TransactionType
  subsidiaryId: number
  counterpartyId: number | null
  subAccountId: number
  mainAccountId: number
  applicationFormId: number
  date: string
  currencyCode: string
  exchangeRate: number
  adjustedExchangeRate: number
  amount: number
  adjustedAmount: number
  twdAmount: number
  adjustedTwdAmount: number
  accrualVoucherNumber: string | null
  actualVoucherNumber: string | null
  invoiceNumber: string | null
  uniformInvoiceNumber: string | null
  invoiceDate: string | null
  note: string | null
  isLocked: boolean
  isDeleted: boolean
  creatorId: number
  subsidiaryName: string
  counterpartyName: string | null
  identificationNumber: string | null
  applicationFormName: string | null
  counterpartyEntityType: string | null
  registeredAddress: string | null
  mainAccountName: string | null
  subAccountName: string | null
  creatorName: string | null
}

export class FinancialRecordDetailResponseDto extends IdResponse {
  constructor(props: FinancialRecordDetailResponseDtoProps) {
    super(props.id)
    this.transactionType = props.transactionType
    this.subsidiaryId = props.subsidiaryId
    this.counterpartyId = props.counterpartyId
    this.subAccountId = props.subAccountId
    this.mainAccountId = props.mainAccountId
    this.applicationFormId = props.applicationFormId
    this.date = props.date
    this.currencyCode = props.currencyCode
    this.exchangeRate = props.exchangeRate
    this.adjustedExchangeRate = props.adjustedExchangeRate
    this.amount = props.amount
    this.adjustedAmount = props.adjustedAmount
    this.twdAmount = props.twdAmount
    this.adjustedTwdAmount = props.adjustedTwdAmount
    this.accrualVoucherNumber = props.accrualVoucherNumber
    this.actualVoucherNumber = props.actualVoucherNumber
    this.invoiceNumber = props.invoiceNumber
    this.uniformInvoiceNumber = props.uniformInvoiceNumber
    this.invoiceDate = props.invoiceDate
    this.note = props.note
    this.isLocked = props.isLocked
    this.isDeleted = props.isDeleted
    this.creatorId = props.creatorId
    this.subsidiaryName = props.subsidiaryName
    this.counterpartyName = props.counterpartyName
    this.identificationNumber = props.identificationNumber
    this.applicationFormName = props.applicationFormName
    this.counterpartyEntityType = props.counterpartyEntityType
    this.registeredAddress = props.registeredAddress
    this.mainAccountName = props.mainAccountName
    this.subAccountName = props.subAccountName
    this.creatorName = props.creatorName
  }

  @ApiProperty({
    example: 1,
    description: 'Subsidiary  id of this record',
  })
  subsidiaryId: number

  @ApiProperty({
    example: 'INCOME',
    description: 'Transaction type of this record',
  })
  transactionType: TransactionType

  @ApiProperty({
    example: 1,
    description: 'Counterparty id of this record',
  })
  counterpartyId: number | null

  @ApiProperty({
    example: 1,
    description: 'Sub account id of this record',
  })
  subAccountId: number

  @ApiProperty({
    example: 1,
    description: 'Main account id of this record',
  })
  mainAccountId: number

  @ApiProperty({
    example: 1,
    description: 'Application form id of this record',
  })
  applicationFormId: number

  @ApiProperty({
    example: '2025-01-01',
    description: 'Recognized date of this record',
  })
  date: string

  @ApiProperty({
    example: 'USD',
    description: 'Currency code of this record',
  })
  currencyCode: string

  @ApiProperty({
    example: 0.22,
    description: 'Exchange rate of this record',
  })
  exchangeRate: number

  @ApiProperty({
    example: 0.23,
    description: 'Adjusted exchange rate of this record',
  })
  adjustedExchangeRate: number

  @ApiProperty({
    example: 1000,
    description: 'Amount of this record',
  })
  amount: number

  @ApiProperty({
    example: 1500,
    description: 'Adjusted amount of this record',
  })
  adjustedAmount: number

  @ApiProperty({
    example: 1000,
    description: 'Twd amount of this record',
  })
  twdAmount: number

  @ApiProperty({
    example: 1500,
    description: 'Adjusted twd amount of this record',
  })
  adjustedTwdAmount: number

  @ApiProperty({
    example: 'FX12645879',
    description: 'Accrual voucher number of this record',
  })
  accrualVoucherNumber: string | null

  @ApiProperty({
    example: 'FX12645877',
    description: 'Adjusted accrual voucher number of this record',
  })
  actualVoucherNumber: string | null

  @ApiProperty({
    example: 'FX12645879',
    description: 'Invoice number of this record',
  })
  invoiceNumber: string | null

  @ApiProperty({
    example: 'FX12645877',
    description: 'Uniform invoice number of this record',
  })
  uniformInvoiceNumber: string | null

  @ApiProperty({
    example: '2025-01-01',
    description: 'Invoice date of this record',
  })
  invoiceDate: string | null

  @ApiProperty({
    example: 'Something',
    description: 'Note of this record',
  })
  note: string | null

  @ApiProperty({
    example: true,
    description: 'Lock state of this record',
  })
  isLocked: boolean

  @ApiProperty({
    example: true,
    description: 'Mark as delete state of this record',
  })
  isDeleted: boolean

  @ApiProperty({
    example: 1,
    description: 'Creator id of this record',
  })
  creatorId: number

  @ApiProperty({
    example: 'Subsidiary name',
    description: 'Subsidiary name of this record',
  })
  subsidiaryName: string

  @ApiProperty({
    example: 'Counterparty name',
    description: 'Counterparty name of this record',
  })
  counterpartyName: string | null

  @ApiProperty({
    example: '12345678',
    description: 'Identification number of this record',
  })
  identificationNumber: string | null
  @ApiProperty({
    example: 'Application form name',
    description: 'Application form name of this record',
  })
  applicationFormName: string | null

  @ApiProperty({
    example: 'DOMESTIC_PERSON',
    description: 'Counterparty entity type of this record',
  })
  counterpartyEntityType: string | null

  @ApiProperty({
    example: 'Registered address',
    description: 'Registered address of this record',
  })
  registeredAddress: string | null

  @ApiProperty({
    example: 'Main account name',
    description: 'Main account name of this record',
  })
  mainAccountName: string | null

  @ApiProperty({
    example: 'Sub account name',
    description: 'Sub account name of this record',
  })
  subAccountName: string | null

  @ApiProperty({
    example: 'Creator name',
    description: 'Creator name of this record',
  })
  creatorName: string | null
}
