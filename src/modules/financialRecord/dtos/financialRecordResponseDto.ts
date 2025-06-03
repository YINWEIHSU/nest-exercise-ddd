import { ResponseBase } from '@libs/api/response.base'
import { TransactionType } from '@libs/enums/transactionTypeEnums'
import { ApiProperty } from '@nestjs/swagger'
import { TypeOrmFinancialRecordEntity } from '../database/typeorm/typeOrmFinancialRecordEntity'

export class FinancialRecordResponseDto extends ResponseBase {
  constructor(props: TypeOrmFinancialRecordEntity) {
    super(props)
    this.subsidiaryId = props.subsidiary_id
    this.transactionType = props.transaction_type
    this.counterpartyId = props.counterparty_id
    this.subAccountId = props.sub_account_id
    // this.mainAccountId = props.main_account_id;
    // this.applicationFormId = props.application_form_id;
    this.date = props.date
    this.currencyCode = props.currency_code
    this.exchangeRate = props.exchange_rate
    this.adjustedExchangeRate = props.adjusted_exchange_rate
    this.amount = props.amount
    this.adjustedAmount = props.adjusted_amount
    this.twdAmount = props.TWD_amount
    this.adjustedTwdAmount = props.adjusted_TWD_amount
    this.accrualVoucherNumber = props.accrual_voucher_number
    this.actualVoucherNumber = props.actual_voucher_number
    this.invoiceNumber = props.invoice_number
    this.uniformInvoiceNumber = props.uniform_invoice_number
    this.invoiceDate = props.invoice_date
    this.note = props.note
    this.isLocked = props.is_locked
    this.isDeleted = props.is_deleted
    this.creatorId = props.creator_id
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
}
