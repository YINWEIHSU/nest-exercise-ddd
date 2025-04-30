import { ValueObject } from '@libs/ddd';
import { Guard } from '@libs/guard';
import {
  ArgumentOutOfRangeException,
  ArgumentInvalidException,
} from '@libs/exceptions';

/** Note:
 * Value Objects with multiple properties can contain
 * other Value Objects inside if needed.
 * */

export interface InvoiceProps {
  invoiceNumber?: string;
  uniformInvoiceNumber?: string;
  invoiceDate?: string;
}

export class Invoice extends ValueObject<InvoiceProps> {
  get invoiceNumber(): string | undefined {
    return this.props.invoiceNumber;
  }

  get uniformInvoiceNumber(): string | undefined {
    return this.props.uniformInvoiceNumber;
  }

  get invoiceDate(): string | undefined {
    return this.props.invoiceDate;
  }

  /**
   * Note: This is a very simplified example of validation,
   * real world projects will have stricter rules.
   * You can avoid this type of validation here and validate
   * only on the edge of the application (in controllers when receiving
   * a request) sacrificing some security for performance and convenience.
   */
  protected validate(props: InvoiceProps): void {
    if (props.invoiceNumber && !Guard.lengthIsBetween(props.invoiceNumber, 2, 15)) {
      throw new ArgumentOutOfRangeException('country is out of range');
    }
    if (props.uniformInvoiceNumber && !Guard.lengthIsBetween(props.uniformInvoiceNumber, 2, 15)) {
      throw new ArgumentOutOfRangeException('street is out of range');
    }
    if (props.invoiceDate && !Guard.isDateFormat(props.invoiceDate)) {
      throw new ArgumentInvalidException('postalCode is out of range');
    }
  }
}
