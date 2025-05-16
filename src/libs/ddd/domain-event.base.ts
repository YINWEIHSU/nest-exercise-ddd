import { randomUUID } from 'crypto';
import { ArgumentNotProvidedException } from '../exceptions';
import { Guard } from '../guard';
import { RequestContextService } from '@libs/application/context/AppRequestContext';

type DomainEventMetadata = {
  /** Timestamp when this domain event occurred */
  readonly timestamp: number;

  /** ID for correlation purposes (for Integration Events,logs correlation, etc).
   */
  readonly correlationId: string;

  /**
   * Causation id used to reconstruct execution order if needed
   */
  readonly causationId?: string;

  /**
   * User ID for debugging and logging purposes
   */
  readonly userId?: string;
};

export type DomainEventProps<T> = Omit<T, 'id' | 'metadata'> & {
  aggregateId: string;
  metadata?: DomainEventMetadata;
};

export abstract class DomainEvent {
  public readonly id: string;

  /** Aggregate ID where domain event occurred */
  public readonly aggregateId: string;

  public readonly metadata: DomainEventMetadata;

  constructor(props: DomainEventProps<unknown>) {
    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException(
        'DomainEvent props should not be empty',
      );
    }
    this.id = randomUUID();
    this.aggregateId = props.aggregateId;
    this.metadata = {
      correlationId:
        props?.metadata?.correlationId || RequestContextService.getRequestId(),
      causationId: props?.metadata?.causationId,
      timestamp: props?.metadata?.timestamp || Date.now(),
      userId: props?.metadata?.userId,
    };
  }
}

export type BatchDomainEventProps<T> = Omit<T, 'id' | 'metadata'> & {
  financialRecordIds: string[];
  metadata?: DomainEventMetadata;
};

export abstract class BatchDomainEvent extends DomainEvent {
  public readonly financialRecordIds: string[];

  constructor(props: BatchDomainEventProps<unknown>) {
    super({
      aggregateId: props.financialRecordIds[0].toString(), // 代表整體事件的主鍵
      metadata: props.metadata,
    });

    if (Guard.isEmpty(props.financialRecordIds)) {
      throw new ArgumentNotProvidedException('aggregateIds should not be empty');
    }

    this.financialRecordIds= props.financialRecordIds;
  }
}
