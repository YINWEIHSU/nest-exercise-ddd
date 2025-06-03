import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { TypeOrmFinancialRecordRepositoryAdapter } from '../../database/financialRecordRepository'
import { FinancialRecordBatchUpdatedDomainEvent } from '../../domain/events/financialRecordBatchUpdatedDomainEvent'
import { FINANCIAL_RECORD_REPOSITORY } from '../../financialRecordDiTokens'
import { DeleteFinancialRecordsCommand } from './deleteFinancialRecordsCommand'

@CommandHandler(DeleteFinancialRecordsCommand)
export class DeleteFinancialRecordsService
  implements ICommandHandler<DeleteFinancialRecordsCommand, object>
{
  constructor(
    @Inject(FINANCIAL_RECORD_REPOSITORY)
    private readonly financialRecordRepo: TypeOrmFinancialRecordRepositoryAdapter,
  ) {}

  async execute(command: DeleteFinancialRecordsCommand): Promise<object> {
    //找出特定的財務紀錄
    const financialRecords = await this.financialRecordRepo.findByIds(
      command.ids,
    )
    const sucessResponse = {
      message: '成功刪除',
    }

    if (financialRecords.length === 0) {
      return sucessResponse
    }
    const oldValues = financialRecords.map((financialRecord) => {
      return {
        id: financialRecord.id,
        is_deleted: financialRecord.isDeleted,
      }
    })
    //將這些紀錄鎖定
    financialRecords.forEach((financialRecord) => {
      financialRecord.delete()
    })
    await this.financialRecordRepo.transaction(async (entityManager) => {
      // 利用第一個財務紀錄來加入事件
      const financialRecord = financialRecords[0]
      if (financialRecord) {
        financialRecord.addEvent(
          new FinancialRecordBatchUpdatedDomainEvent({
            financialRecordIds: command.ids,
            userId: command.metadata.userId as string,
            oldValues: oldValues,
            newValues: {
              is_deleted: true,
            },
            changeReason: '刪除財務紀錄',
          }),
        )
        //執行批次更新,此時才開始進行資料庫持久化
        await this.financialRecordRepo.batchSave(
          financialRecords,
          entityManager,
        )
      }
    })

    return sucessResponse
  }
}
