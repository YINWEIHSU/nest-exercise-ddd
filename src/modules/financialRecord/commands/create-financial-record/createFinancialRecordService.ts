import { Money } from '../../domain/value-objects/moneyValueObject';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateFinancialRecordCommand } from './createFinancialRecordCommand';
import { AggregateID } from '@libs/ddd';
import { FinancialRecordEntity } from '../../domain/financialRecordEntity';
import { TypeOrmFinancialRecordRepositoryAdapter } from '../../database/financialRecordRepository';
import { FINANCIAL_RECORD_REPOSITORY } from '../../financialRecordDiTokens';

@CommandHandler(CreateFinancialRecordCommand)
export class CreateFinancialRecordService
  implements ICommandHandler<CreateFinancialRecordCommand, AggregateID>
{
  constructor(
    @Inject(FINANCIAL_RECORD_REPOSITORY)
    protected readonly financialRecordRepo: TypeOrmFinancialRecordRepositoryAdapter,
  ) {}

  async execute(command: CreateFinancialRecordCommand): Promise<AggregateID> {
    const financialRecord = FinancialRecordEntity.create({
      subsidiaryId: command.subsidiaryId.toString(),
      subAccountId: command.subAccountId.toString(),
      counterpartyId: command.counterpartyId.toString(),
      date: command.date,
      money: new Money({
        currencyCode: command.currencyCode,
        exchangeRate: command.exchangeRate,
        amount: command.amount,
        twdAmount: command.twdAmount,
        adjustedExchangeRate: command.exchangeRate,
        adjustedAmount: command.amount,
        adjustedTwdAmount: command.twdAmount,
      }),
      note: command.note,
      creatorId: command.metadata.userId as string,
    });
    return await this.financialRecordRepo.transaction(async (entityManager) => {
      const id = await this.financialRecordRepo.insert(
        financialRecord,
        entityManager,
      );

      // 返回聚合根 ID
      return id.toString();
    });
  }
}
