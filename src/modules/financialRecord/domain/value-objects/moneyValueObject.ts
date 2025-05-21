import { ValueObject } from '@libs/ddd'
import { ArgumentOutOfRangeException } from '@libs/exceptions'
import { Guard } from '@libs/guard'

/** Note:
 * Value Objects with multiple properties can contain
 * other Value Objects inside if needed.
 * */

export interface MoneyProps {
  amount: number
  adjustedAmount: number
  currencyCode: string
  exchangeRate: number
  adjustedExchangeRate: number
  twdAmount: number
  adjustedTwdAmount: number
}

export class Money extends ValueObject<MoneyProps> {
  get amount(): number {
    return this.props.amount
  }
  get adjustedAmount(): number {
    return this.props.adjustedAmount
  }
  get currencyCode(): string {
    return this.props.currencyCode
  }
  get exchangeRate(): number {
    return this.props.exchangeRate
  }
  get adjustedExchangeRate(): number {
    return this.props.adjustedExchangeRate
  }
  get twdAmount(): number {
    return this.props.twdAmount
  }
  get adjustedTwdAmount(): number {
    return this.props.adjustedTwdAmount
  }

  /**
   * Note: This is a very simplified example of validation,
   * real world projects will have stricter rules.
   * You can avoid this type of validation here and validate
   * only on the edge of the application (in controllers when receiving
   * a request) sacrificing some security for performance and convenience.
   */
  protected validate(props: MoneyProps): void {
    if (!Guard.lengthIsBetween(props.currencyCode, 3, 3)) {
      throw new ArgumentOutOfRangeException('currency code is out of range')
    }
  }
}
