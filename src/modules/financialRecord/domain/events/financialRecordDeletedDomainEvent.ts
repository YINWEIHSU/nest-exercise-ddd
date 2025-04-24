import { DomainEvent, DomainEventProps } from '@libs/ddd';

export class FinancialRecordDeletedDomainEvent extends DomainEvent {
  constructor(props: DomainEventProps<FinancialRecordDeletedDomainEvent>) {
    super(props);
  }
}
