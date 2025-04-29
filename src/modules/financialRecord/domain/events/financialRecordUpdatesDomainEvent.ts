import { DomainEvent, DomainEventProps } from '@libs/ddd';

export class FinancialRecordUpdatedDomainEvent extends DomainEvent {
  readonly financialRecordId: string;
  readonly userId: string;
  readonly oldValues: Record<string, any>;
  readonly newValues: Record<string, any>;
  readonly changeReason: string;

  constructor(props: DomainEventProps<FinancialRecordUpdatedDomainEvent>) {
    super(props);
    this.financialRecordId = props.aggregateId;
    this.userId = props.userId;
    this.oldValues = props.oldValues;
    this.newValues = props.newValues;
    this.changeReason = props.changeReason;
  }
}
