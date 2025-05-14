import { FinancialRecordUpdatedDomainEvent } from '../../domain/events/financialRecordUpdatedDomainEvent';
import { FinancialRecordBatchUpdatedDomainEvent } from '../../domain/events/financialRecordBatchUpdatedDomainEvent';
import { FinancialRecordRepositoryPort } from '../../database/financialRecordRepositoryPort';
import { OnEvent } from '@nestjs/event-emitter';
import { Inject, Injectable } from '@nestjs/common';
import { FINANCIAL_RECORD_REPOSITORY } from '../../financialRecordDiTokens';

@Injectable()
export class FinancialRecordIsBatchUpdatedEventHandler {
  constructor(
    @Inject(FINANCIAL_RECORD_REPOSITORY)
    private readonly repo: FinancialRecordRepositoryPort,
  ) {}

  @OnEvent(FinancialRecordBatchUpdatedDomainEvent.name, {
    async: true,
    promisify: true,
  })
  async handle(event: FinancialRecordBatchUpdatedDomainEvent): Promise<any> {
    return this.repo.logBatchChanges(
      event.financialRecordIds,
      parseInt(event.userId),
      event.oldValues,
      event.newValues,
      event.changeReason,
    );
  }
}
