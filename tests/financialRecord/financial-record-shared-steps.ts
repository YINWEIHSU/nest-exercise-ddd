import { Mutable } from '@src/libs/types';
import { CreateFinancialRecordRequestDto } from '@src/modules/financialRecord/commands/create-financial-record/createFinancialRecordRequestDto';
import { DefineStepFunction } from 'jest-cucumber';
import { TestContext } from 'tests/test-utils/TestContext';
import { ApiClient } from '@tests/test-utils/ApiClient';

/**
 * Test steps that are shared between multiple financial record tests
 */

export type CreateFinancialRecordTestContext = {
  createFinancialRecordDto: Mutable<CreateFinancialRecordRequestDto>;
};

export const givenFinancialRecordProfileData = (
  given: DefineStepFunction,
  ctx: TestContext<CreateFinancialRecordTestContext>,
): void => {
  given(
    /^financial record profile data$/,
    (table: CreateFinancialRecordRequestDto[]) => {
      const rawData = { ...table[0] };
      const createFinancialRecordDto: CreateFinancialRecordRequestDto = {
        subsidiaryId: Number(rawData.subsidiaryId),
        counterpartyId: Number(rawData.counterpartyId),
        subAccountId: Number(rawData.subAccountId),
        date: rawData.date,
        currencyCode: rawData.currencyCode,
        exchangeRate: Number(rawData.exchangeRate),
        amount: Number(rawData.amount),
        twdAmount: Number(rawData.twdAmount),
        note: rawData.note,
      };
      ctx.context.createFinancialRecordDto = createFinancialRecordDto;
    },
  );
};

export const iSendARequestToCreateAFinancialRecord = (
  when: DefineStepFunction,
  ctx: TestContext<CreateFinancialRecordTestContext>,
): void => {
  when('I send a request to create a financial record', async () => {
    const response = await new ApiClient().createFinancialRecord(
      ctx.context.createFinancialRecordDto,
    );
    ctx.latestResponse = response;
  });
};
