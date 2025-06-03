import { Command, CommandProps } from '@libs/ddd'

export class CreateFinancialRecordCommand extends Command {
  readonly subsidiaryId: number
  readonly counterpartyId: number
  readonly subAccountId: number
  readonly date: string
  readonly currencyCode: string
  readonly exchangeRate: number
  readonly amount: number
  readonly twdAmount: number
  readonly note: string

  constructor(props: CommandProps<CreateFinancialRecordCommand>) {
    super(props)
    this.subsidiaryId = props.subsidiaryId
    this.counterpartyId = props.counterpartyId
    this.subAccountId = props.subAccountId
    this.date = props.date
    this.currencyCode = props.currencyCode
    this.exchangeRate = props.exchangeRate
    this.amount = props.amount
    this.twdAmount = props.twdAmount
    this.note = props.note
  }
}
