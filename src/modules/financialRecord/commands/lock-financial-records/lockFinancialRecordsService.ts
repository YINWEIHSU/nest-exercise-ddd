import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { LockFinancialRecordsCommand } from './lockFinancialRecordsCommand';
import { FinancialRecordBatchUpdatedDomainEvent } from '../../domain/events/financialRecordBatchUpdatedDomainEvent';
import { TypeOrmFinancialRecordRepositoryAdapter } from '../../database/financialRecordRepository';
import { FINANCIAL_RECORD_REPOSITORY } from '../../financialRecordDiTokens';

@CommandHandler(LockFinancialRecordsCommand)
export class LockFinancialRecordsService
  
  implements ICommandHandler<LockFinancialRecordsCommand, object> {
    constructor(
      @Inject(FINANCIAL_RECORD_REPOSITORY)
      private readonly financialRecordRepo: TypeOrmFinancialRecordRepositoryAdapter,

    ) {}

  async execute(
    command: LockFinancialRecordsCommand,
  ): Promise<object> {
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

    return {
      "message": "成功上鎖"
    };
  }
}
