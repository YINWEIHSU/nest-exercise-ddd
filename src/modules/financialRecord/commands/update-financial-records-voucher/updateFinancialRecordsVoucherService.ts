import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TypeOrmFinancialRecordRepositoryAdapter } from '../../database/financialRecordRepository';
import { FinancialRecordBatchUpdatedDomainEvent } from '../../domain/events/financialRecordBatchUpdatedDomainEvent';
import { FINANCIAL_RECORD_REPOSITORY } from '../../financialRecordDiTokens';
import { UpdateFinancialRecordsVoucherCommand } from './updateFinancialRecordsIVoucherCommand';

@CommandHandler(UpdateFinancialRecordsVoucherCommand)
export class UpdateFinancialRecordsVoucherService
  implements ICommandHandler<UpdateFinancialRecordsVoucherCommand, object>
{
  constructor(
    @Inject(FINANCIAL_RECORD_REPOSITORY)
    private readonly financialRecordRepo: TypeOrmFinancialRecordRepositoryAdapter,
  ) {}

  async execute(
    command: UpdateFinancialRecordsVoucherCommand,
  ): Promise<object> {
    //找出特定的財務紀錄
    const financialRecords = await this.financialRecordRepo.findByIds(
      command.financialRecordIds,
    );
    const oldValues = financialRecords.map((financialRecord) => {
      return {
        id: financialRecord.id,
        accrualVoucherNumber: financialRecord.voucher?.accrualVoucherNumber,
        actualVoucherNumber: financialRecord.voucher?.actualVoucherNumber,
      };
    });
    //將傳票資訊更新到財務紀錄實體上
    financialRecords.forEach((financialRecord) => {
      financialRecord.updateVoucher(command.voucherNumber);
      return financialRecord;
    });
    await this.financialRecordRepo.transaction(async (entityManager) => {
      // 利用第一個財務紀錄來加入事件
      const financialRecord = financialRecords[0];
      if (financialRecord) {
        financialRecord.addEvent(
          new FinancialRecordBatchUpdatedDomainEvent({
            financialRecordIds: command.financialRecordIds,
            userId: command.metadata.userId as string,
            oldValues: oldValues,
            newValues: command.voucherNumber,
            changeReason: '更新傳票資訊',
          }),
        );
      }
      //執行批次更新,此時才開始進行資料庫持久化
      await this.financialRecordRepo.batchSave(financialRecords, entityManager);
    });

    return {
      message: '成功更新傳票資訊',
    };
  }
}
