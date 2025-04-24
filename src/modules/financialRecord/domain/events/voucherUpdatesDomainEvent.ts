import { DomainEvent, DomainEventProps } from '@libs/ddd';

export class VoucherUpdatedDomainEvent extends DomainEvent {
  readonly accrualVoucherNumber: string;
  readonly actualVoucherNumber: string;

  constructor(props: DomainEventProps<VoucherUpdatedDomainEvent>) {
    super(props);
    this.accrualVoucherNumber = props.accrualVoucherNumber;
    this.actualVoucherNumber = props.actualVoucherNumber;
  }
}
