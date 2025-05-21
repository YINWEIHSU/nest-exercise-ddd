import { DomainEvent, DomainEventProps } from '@libs/ddd'

export class MoneyUpdatedDomainEvent extends DomainEvent {
  readonly amount: number
  readonly adjustedAmount: number
  readonly currencyCode: string
  readonly exchangeRate: number
  readonly adjustedExchangeRate: number
  readonly twdAmount: number
  readonly adjustedTwdAmount: number

  constructor(props: DomainEventProps<MoneyUpdatedDomainEvent>) {
    super(props)
    this.amount = props.amount
    this.adjustedAmount = props.adjustedAmount
    this.currencyCode = props.currencyCode
    this.exchangeRate = props.exchangeRate
    this.adjustedExchangeRate = props.adjustedExchangeRate
    this.twdAmount = props.twdAmount
    this.adjustedTwdAmount = props.adjustedTwdAmount
  }
}
