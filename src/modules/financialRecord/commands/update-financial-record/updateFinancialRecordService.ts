import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TypeOrmFinancialRecordRepositoryAdapter } from '../../database/financialRecordRepository';
import { FinancialRecordUpdatedDomainEvent } from '../../domain/events/financialRecordUpdatedDomainEvent';
import { FinancialRecordEntity } from '../../domain/financialRecordEntity';
import { FINANCIAL_RECORD_REPOSITORY } from '../../financialRecordDiTokens';
import { UpdateFinancialRecordCommand } from './updateFinancialRecordCommand';
import { UpdateFinancialRecordRequestDto } from './updateFinancialRecordRequestDto';

@CommandHandler(UpdateFinancialRecordCommand)
export class UpdateFinancialRecordService
  implements
    ICommandHandler<
      UpdateFinancialRecordCommand,
      Partial<UpdateFinancialRecordRequestDto>
    >
{
  constructor(
    @Inject(FINANCIAL_RECORD_REPOSITORY)
    protected readonly financialRecordRepo: TypeOrmFinancialRecordRepositoryAdapter,
  ) {}

  async execute(
    command: UpdateFinancialRecordCommand,
  ): Promise<Partial<UpdateFinancialRecordRequestDto>> {
    // 獲取現有的財務記錄實體
    const financialRecord = await this.financialRecordRepo.findOneById(
      command.id,
    );

    if (!financialRecord) {
      throw new Error(`FinancialRecord with id ${command.id} not found`);
    }

    // 保存修改前的原始值
    const oldValues = this.getOriginalValues(financialRecord);

    // 追踪哪些字段被修改了
    const changedFields = this.getChangedFields(financialRecord, command);

    // 更新 Money 相關字段
    if (
      command.currencyCode ||
      command.exchangeRate ||
      command.amount ||
      command.twdAmount ||
      command.adjustedExchangeRate ||
      command.adjustedAmount ||
      command.adjustedTwdAmount
    ) {
      financialRecord.updateMoney({
        currencyCode:
          command.currencyCode || financialRecord.money.currencyCode,
        exchangeRate:
          command.exchangeRate || financialRecord.money.exchangeRate,
        amount: command.amount || financialRecord.money.amount,
        adjustedExchangeRate:
          command.adjustedExchangeRate ||
          financialRecord.money.adjustedExchangeRate,
        adjustedAmount:
          command.adjustedAmount || financialRecord.money.adjustedAmount,
        twdAmount: command.twdAmount || financialRecord.money.twdAmount,
        adjustedTwdAmount:
          command.adjustedTwdAmount || financialRecord.money.adjustedTwdAmount,
      });
    }

    // 更新 Voucher 相關字段
    if (command.accrualVoucherNumber || command.actualVoucherNumber) {
      financialRecord.updateVoucher({
        accrualVoucherNumber:
          command.accrualVoucherNumber ||
          financialRecord.voucher?.accrualVoucherNumber,
        actualVoucherNumber:
          command.actualVoucherNumber ||
          financialRecord.voucher?.actualVoucherNumber,
      });
    }

    // 更新 Invoice 相關字段
    if (
      command.invoiceNumber ||
      command.uniformInvoiceNumber ||
      command.invoiceDate
    ) {
      financialRecord.updateInvoice({
        invoiceNumber:
          command.invoiceNumber || financialRecord.invoice?.invoiceNumber,
        uniformInvoiceNumber:
          command.uniformInvoiceNumber ||
          financialRecord.invoice?.uniformInvoiceNumber,
        invoiceDate:
          command.invoiceDate || financialRecord.invoice?.invoiceDate,
      });
    }

    // 更新基本信息字段
    if (
      command.subsidiaryId ||
      command.subAccountId ||
      command.counterpartyId ||
      command.date ||
      command.note
    ) {
      financialRecord.updateBasicInfo({
        subsidiaryId: command.subsidiaryId
          ? command.subsidiaryId.toString()
          : financialRecord.subsidiaryId,
        subAccountId: command.subAccountId
          ? command.subAccountId.toString()
          : financialRecord.subAccountId,
        counterpartyId: command.counterpartyId
          ? command.counterpartyId.toString()
          : financialRecord.counterpartyId,
        date: command.date || financialRecord.date,
        note: command.note || financialRecord.note,
      });
    }

    // 取得更新後的值
    const changeValues = this.getUpdatedValues(financialRecord, changedFields);

    if (Object.keys(changeValues).length > 0) {
      // 添加更新事件，只包含已變更的字段
      financialRecord.addEvent(
        new FinancialRecordUpdatedDomainEvent({
          aggregateId: financialRecord.id,
          financialRecordId: financialRecord.id,
          changeReason: command.changeReason,
          userId: command.metadata.userId as string,
          oldValues,
          newValues: { ...oldValues, ...changeValues },
        }),
      );
    }

    return await this.financialRecordRepo.transaction(async (entityManager) => {
      await this.financialRecordRepo.save(financialRecord, entityManager);

      // 返回聚合根 ID
      return changeValues;
    });
  }

  // 獲取原始值，只包含即將更新的字段
  private getOriginalValues(
    financialRecord: FinancialRecordEntity,
  ): Record<string, any> {
    const result: Record<string, any> = {};

    // 獲取基本信息
    result.subsidiaryId = financialRecord.subsidiaryId;
    result.subAccountId = financialRecord.subAccountId;
    result.counterpartyId = financialRecord.counterpartyId;
    result.date = financialRecord.date;
    result.note = financialRecord.note;

    // 獲取 Money 信息
    if (financialRecord.money) {
      result.currencyCode = financialRecord.money.currencyCode;
      result.exchangeRate = financialRecord.money.exchangeRate;
      result.amount = financialRecord.money.amount;
      result.adjustedExchangeRate = financialRecord.money.adjustedExchangeRate;
      result.adjustedAmount = financialRecord.money.adjustedAmount;
      result.twdAmount = financialRecord.money.twdAmount;
      result.adjustedTwdAmount = financialRecord.money.adjustedTwdAmount;
    }

    // 獲取 Voucher 信息
    if (financialRecord.voucher) {
      result.accrualVoucherNumber =
        financialRecord.voucher.accrualVoucherNumber;
      result.actualVoucherNumber = financialRecord.voucher.actualVoucherNumber;
    }

    // 獲取 Invoice 信息
    if (financialRecord.invoice) {
      result.invoiceNumber = financialRecord.invoice.invoiceNumber;
      result.uniformInvoiceNumber =
        financialRecord.invoice.uniformInvoiceNumber;
      result.invoiceDate = financialRecord.invoice.invoiceDate;
    }

    return result;
  }

  // 確定哪些字段被修改了
  private getChangedFields(
    financialRecord: FinancialRecordEntity,
    command: UpdateFinancialRecordCommand,
  ): Set<string> {
    const changedFields = new Set<string>();

    // 檢查基本信息
    if (
      command.subsidiaryId &&
      command.subsidiaryId.toString() !== financialRecord.subsidiaryId
    ) {
      changedFields.add('subsidiaryId');
    }
    if (
      command.subAccountId &&
      command.subAccountId.toString() !== financialRecord.subAccountId
    ) {
      changedFields.add('subAccountId');
    }
    if (
      command.counterpartyId &&
      command.counterpartyId.toString() !== financialRecord.counterpartyId
    ) {
      changedFields.add('counterpartyId');
    }
    if (command.date && command.date !== financialRecord.date) {
      changedFields.add('date');
    }
    if (command.note && command.note !== financialRecord.note) {
      changedFields.add('note');
    }

    // 檢查 Money 字段
    if (
      command.currencyCode &&
      command.currencyCode !== financialRecord.money.currencyCode
    ) {
      changedFields.add('currencyCode');
    }
    if (
      command.exchangeRate &&
      command.exchangeRate !== financialRecord.money.exchangeRate
    ) {
      changedFields.add('exchangeRate');
    }
    if (command.amount && command.amount !== financialRecord.money.amount) {
      changedFields.add('amount');
    }
    if (
      command.adjustedExchangeRate &&
      command.adjustedExchangeRate !==
        financialRecord.money.adjustedExchangeRate
    ) {
      changedFields.add('adjustedExchangeRate');
    }
    if (
      command.adjustedAmount &&
      command.adjustedAmount !== financialRecord.money.adjustedAmount
    ) {
      changedFields.add('adjustedAmount');
    }
    if (
      command.twdAmount &&
      command.twdAmount !== financialRecord.money.twdAmount
    ) {
      changedFields.add('twdAmount');
    }
    if (
      command.adjustedTwdAmount &&
      command.adjustedTwdAmount !== financialRecord.money.adjustedTwdAmount
    ) {
      changedFields.add('adjustedTwdAmount');
    }

    // 檢查 Voucher 字段
    if (
      command.accrualVoucherNumber &&
      command.accrualVoucherNumber !==
        financialRecord.voucher?.accrualVoucherNumber
    ) {
      changedFields.add('accrualVoucherNumber');
    }
    if (
      command.actualVoucherNumber &&
      command.actualVoucherNumber !==
        financialRecord.voucher?.actualVoucherNumber
    ) {
      changedFields.add('actualVoucherNumber');
    }

    // 檢查 Invoice 字段
    if (
      command.invoiceNumber &&
      command.invoiceNumber !== financialRecord.invoice?.invoiceNumber
    ) {
      changedFields.add('invoiceNumber');
    }
    if (
      command.uniformInvoiceNumber &&
      command.uniformInvoiceNumber !==
        financialRecord.invoice?.uniformInvoiceNumber
    ) {
      changedFields.add('uniformInvoiceNumber');
    }
    if (
      command.invoiceDate &&
      command.invoiceDate !== financialRecord.invoice?.invoiceDate
    ) {
      changedFields.add('invoiceDate');
    }

    return changedFields;
  }

  // 獲取更新後的值，只包含已變更的字段
  private getUpdatedValues(
    financialRecord: FinancialRecordEntity,
    changedFields: Set<string>,
  ): Record<string, any> {
    const result: Record<string, any> = {};

    // 只包含被修改的字段
    if (changedFields.has('subsidiaryId')) {
      result.subsidiaryId = financialRecord.subsidiaryId;
    }
    if (changedFields.has('subAccountId')) {
      result.subAccountId = financialRecord.subAccountId;
    }
    if (changedFields.has('counterpartyId')) {
      result.counterpartyId = financialRecord.counterpartyId;
    }
    if (changedFields.has('date')) {
      result.date = financialRecord.date;
    }
    if (changedFields.has('note')) {
      result.note = financialRecord.note;
    }

    // Money 相關字段
    if (changedFields.has('currencyCode')) {
      result.currencyCode = financialRecord.money.currencyCode;
    }
    if (changedFields.has('exchangeRate')) {
      result.exchangeRate = financialRecord.money.exchangeRate;
    }
    if (changedFields.has('amount')) {
      result.amount = financialRecord.money.amount;
    }
    if (changedFields.has('adjustedExchangeRate')) {
      result.adjustedExchangeRate = financialRecord.money.adjustedExchangeRate;
    }
    if (changedFields.has('adjustedAmount')) {
      result.adjustedAmount = financialRecord.money.adjustedAmount;
    }
    if (changedFields.has('twdAmount')) {
      result.twdAmount = financialRecord.money.twdAmount;
    }
    if (changedFields.has('adjustedTwdAmount')) {
      result.adjustedTwdAmount = financialRecord.money.adjustedTwdAmount;
    }

    // Voucher 相關字段
    if (changedFields.has('accrualVoucherNumber') && financialRecord.voucher) {
      result.accrualVoucherNumber =
        financialRecord.voucher.accrualVoucherNumber;
    }
    if (changedFields.has('actualVoucherNumber') && financialRecord.voucher) {
      result.actualVoucherNumber = financialRecord.voucher.actualVoucherNumber;
    }

    // Invoice 相關字段
    if (changedFields.has('invoiceNumber') && financialRecord.invoice) {
      result.invoiceNumber = financialRecord.invoice.invoiceNumber;
    }
    if (changedFields.has('uniformInvoiceNumber') && financialRecord.invoice) {
      result.uniformInvoiceNumber =
        financialRecord.invoice.uniformInvoiceNumber;
    }
    if (changedFields.has('invoiceDate') && financialRecord.invoice) {
      result.invoiceDate = financialRecord.invoice.invoiceDate;
    }

    return result;
  }
}
