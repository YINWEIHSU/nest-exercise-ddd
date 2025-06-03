import { Inject, Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { FinancialRecordRepositoryPort } from '../../database/financialRecordRepositoryPort'
import { FinancialRecordUpdatedDomainEvent } from '../../domain/events/financialRecordUpdatedDomainEvent'
import { FINANCIAL_RECORD_REPOSITORY } from '../../financialRecordDiTokens'

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
  async handle(event: FinancialRecordUpdatedDomainEvent): Promise<void> {
    return await this.repo.logChanges(
      parseInt(event.aggregateId),
      parseInt(event.userId),
      event.oldValues,
      event.newValues,
      event.changeReason,
    )
  }
}
