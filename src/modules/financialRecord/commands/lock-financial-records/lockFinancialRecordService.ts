import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { LockFinancialRecordCommand } from './lockFinancialRecordCommand';
import { FinancialRecordEntity } from '../../domain/financialRecordEntity';
import { FinancialRecordUpdatedDomainEvent } from '../../domain/events/financialRecordUpdatedDomainEvent';
import { FinancialRecordBatchUpdatedDomainEvent } from '../../domain/events/financialRecordBatchUpdatedDomainEvent';
import { TypeOrmFinancialRecordRepositoryAdapter } from '../../database/financialRecordRepository';
import { FINANCIAL_RECORD_REPOSITORY } from '../../financialRecordDiTokens';
import { LockFinancialRecordRequestDto } from './lockFinancialRecordRequestDto';

@CommandHandler(LockFinancialRecordCommand)
export class LockFinancialRecordService
  
  implements ICommandHandler<LockFinancialRecordCommand, boolean> {
    constructor(
      @Inject(FINANCIAL_RECORD_REPOSITORY)
      private readonly financialRecordRepo: TypeOrmFinancialRecordRepositoryAdapter,

    ) {}

  async execute(
    command: LockFinancialRecordCommand,
  ): Promise<boolean> {
    //找出特定的財務紀錄
    const financialRecords = await this.financialRecordRepo.findByIds(command.financialRecordIds);
    //將這些紀錄鎖定
    financialRecords.forEach((financialRecord) => { financialRecord.lock(); });


    await this.financialRecordRepo.transaction(async (entityManager) => {
      // 利用第一個財務紀錄來加入事件
      const financialRecord = financialRecords[0];
      if (financialRecord) {
        financialRecord.addEvent(
          new FinancialRecordBatchUpdatedDomainEvent({
            financialRecordIds: command.financialRecordIds,
            userId: command.metadata.userId as string,
            oldValues: {
              is_locked: false
            },
            newValues: {
              is_locked: true
            },
            changeReason: "上鎖",
          }),
        );
      }
     await this.financialRecordRepo.batchSave(financialRecords, entityManager);
    });

    return true;
  }
}
