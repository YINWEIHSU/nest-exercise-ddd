import { DomainEvent, DomainEventProps } from '@libs/ddd';

export class FinancialRecordLockedDomainEvent extends DomainEvent {
  constructor(props: DomainEventProps<FinancialRecordLockedDomainEvent>) {
    super(props);
  }
}
