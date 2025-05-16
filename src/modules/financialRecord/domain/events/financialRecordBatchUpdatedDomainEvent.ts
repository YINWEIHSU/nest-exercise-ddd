import { BatchDomainEvent, BatchDomainEventProps } from '@libs/ddd';

interface FinancialRecordBatchUpdatedEventPayload {
  financialRecordIds: string[];
  userId: string;
  oldValues: Record<string, any>;
  newValues: Record<string, any>;
  changeReason: string;
}


export class FinancialRecordBatchUpdatedDomainEvent extends BatchDomainEvent {
  readonly userId: string;
  readonly oldValues: Record<string, any>;
  readonly newValues: Record<string, any>;
  readonly changeReason: string;

  constructor(props: BatchDomainEventProps<FinancialRecordBatchUpdatedEventPayload>) {
    super(props);
    this.userId = props.userId;
    this.oldValues = props.oldValues;
    this.newValues = props.newValues;
    this.changeReason = props.changeReason;
  }
}





