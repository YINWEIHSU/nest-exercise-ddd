import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateFinancialRecordsInvoiceCommand } from './updateFinancialRecordsInvoiceCommand';
import { FinancialRecordBatchUpdatedDomainEvent } from '../../domain/events/financialRecordBatchUpdatedDomainEvent';
import { TypeOrmFinancialRecordRepositoryAdapter } from '../../database/financialRecordRepository';
import { FINANCIAL_RECORD_REPOSITORY } from '../../financialRecordDiTokens';

@CommandHandler(UpdateFinancialRecordsInvoiceCommand)
export class updateFinancialRecordsInvoiceService
  
  implements ICommandHandler<UpdateFinancialRecordsInvoiceCommand, object> {
    constructor(
      @Inject(FINANCIAL_RECORD_REPOSITORY)
      private readonly financialRecordRepo: TypeOrmFinancialRecordRepositoryAdapter,

    ) {}

  async execute(
    command: UpdateFinancialRecordsInvoiceCommand,
  ): Promise<object> {
    //找出特定的財務紀錄
    const financialRecords = await this.financialRecordRepo.findByIds(command.financialRecordIds);
    const oldValues = financialRecords.map((financialRecord) => {
      return {
        id: financialRecord.id,
        invoiceNumber: financialRecord.invoice?.invoiceNumber,
        uniformInvoiceNumber: financialRecord.invoice?.uniformInvoiceNumber,
        invoiceDate: financialRecord.invoice?.invoiceDate,
      }})
    //將發票資訊更新到財務紀錄實體上
    financialRecords.forEach((financialRecord) => {
      financialRecord.updateInvoice(command.invoiceInfo);
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
            newValues: command.invoiceInfo,
            changeReason: "更新發票資訊",
          }),  
        );
      }
     await this.financialRecordRepo.batchSave(financialRecords, entityManager);
    });

    return {
      "message": "成功更新發票資訊"
    };
  }
}
