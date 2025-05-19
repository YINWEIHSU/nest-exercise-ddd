import { DomainEvent, DomainEventProps } from '@libs/ddd'

export class FinancialRecordCreatedDomainEvent extends DomainEvent {
  readonly subsidiaryId: string
  readonly counterpartyId: string
  readonly subAccountId: string
  readonly date: string
  readonly currencyCode: string
  readonly exchangeRate: number
  readonly amount: number
  readonly twdAmount: number
  readonly note: string

  constructor(props: DomainEventProps<FinancialRecordCreatedDomainEvent>) {
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
