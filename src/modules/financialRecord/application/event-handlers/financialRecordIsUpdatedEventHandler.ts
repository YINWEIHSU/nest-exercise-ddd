import { FinancialRecordUpdatedDomainEvent } from '../../domain/events/financialRecordUpdatedDomainEvent';
import { FinancialRecordRepositoryPort } from '../../database/financialRecordRepositoryPort';
import { OnEvent } from '@nestjs/event-emitter';
import { Inject, Injectable } from '@nestjs/common';
import { FINANCIAL_RECORD_REPOSITORY } from '../../financialRecordDiTokens';

@Injectable()
export class FinancialRecordIsUpdatedEventHandler {
  constructor(
    @Inject(FINANCIAL_RECORD_REPOSITORY)
    private readonly repo: FinancialRecordRepositoryPort,
  ) {}

  @OnEvent(FinancialRecordUpdatedDomainEvent.name, {
    async: true,
    promisify: true,
  })
  async handle(event: FinancialRecordUpdatedDomainEvent): Promise<any> {
    return this.repo.logChanges(
      parseInt(event.aggregateId),
      parseInt(event.userId),
      event.oldValues,
      event.newValues,
      event.changeReason,
    );
  }
}
