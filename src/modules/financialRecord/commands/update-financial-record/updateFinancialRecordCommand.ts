import { Command, CommandProps } from '@libs/ddd'

export class UpdateFinancialRecordCommand extends Command {
  readonly subsidiaryId: number
  readonly counterpartyId: number
  readonly subAccountId: number
  readonly date: string
  readonly currencyCode: string
  readonly exchangeRate?: number
  readonly adjustedExchangeRate?: number
  readonly amount?: number
  readonly adjustedAmount?: number
  readonly twdAmount?: number
  readonly adjustedTwdAmount?: number
  readonly accrualVoucherNumber?: string
  readonly actualVoucherNumber?: string
  readonly invoiceNumber?: string
  readonly uniformInvoiceNumber?: string
  readonly invoiceDate?: string
  readonly note: string
  readonly changeReason: string

  constructor(props: CommandProps<UpdateFinancialRecordCommand>) {
    super(props)
    this.subsidiaryId = props.subsidiaryId
    this.counterpartyId = props.counterpartyId
    this.subAccountId = props.subAccountId
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
    this.changeReason = props.changeReason
  }
}
