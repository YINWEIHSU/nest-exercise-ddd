import { ValueObject } from '@libs/ddd';
import { Guard } from '@libs/guard';
import { ArgumentOutOfRangeException } from '@libs/exceptions';

/** Note:
 * Value Objects with multiple properties can contain
 * other Value Objects inside if needed.
 * */

export interface VoucherProps {
  accrualVoucherNumber?: string;
  actualVoucherNumber?: string;
}

export class Voucher extends ValueObject<VoucherProps> {
  get accrualVoucherNumber(): string | undefined {
    return this.props.accrualVoucherNumber;
  }

  get actualVoucherNumber(): string | undefined {
    return this.props.actualVoucherNumber;
  }

  /**
   * Note: This is a very simplified example of validation,
   * real world projects will have stricter rules.
   * You can avoid this type of validation here and validate
   * only on the edge of the application (in controllers when receiving
   * a request) sacrificing some security for performance and convenience.
   */
  protected validate(props: VoucherProps): void {
    if (props.accrualVoucherNumber && !Guard.lengthIsBetween(props.accrualVoucherNumber, 2, 15)) {
      throw new ArgumentOutOfRangeException('accrual number is out of range');
    }
    if (props.actualVoucherNumber && !Guard.lengthIsBetween(props.actualVoucherNumber, 2, 15)) {
      throw new ArgumentOutOfRangeException('actual number is out of range');
    }
  }
}
