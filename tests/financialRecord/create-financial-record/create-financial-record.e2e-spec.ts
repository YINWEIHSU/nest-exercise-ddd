import { defineFeature, loadFeature } from 'jest-cucumber';
import { getConnectionPool } from '../../setup/jestSetupAfterEnv';
import { DataSource } from 'typeorm';
import { TestContext } from '@tests/test-utils/TestContext';
import { IdResponse } from '@src/libs/api/id.response.dto';
import {
  CreateFinancialRecordTestContext,
  givenFinancialRecordProfileData,
  iSendARequestToCreateAFinancialRecord,
} from '../financial-record-shared-steps';
// import { iReceiveAnErrorWithStatusCode } from '@tests/shared/shared-steps';

const feature = loadFeature(
  'tests/financialRecord/create-financial-record/create-financial-record.feature',
);

/**
 * e2e test implementing a Gherkin feature file
 * https://github.com/Sairyss/backend-best-practices#testing
 */

defineFeature(feature, (test) => {
  let pool: DataSource;

  beforeAll(() => {
    pool = getConnectionPool();
  });

  afterEach(async () => {
    await pool
      .createQueryBuilder()
      .delete()
      .from('financial_records')
      .execute();
  });

  test('I can create a financial record', ({ given, when, then }) => {
    const ctx = new TestContext<CreateFinancialRecordTestContext>();

    givenFinancialRecordProfileData(given, ctx);

    iSendARequestToCreateAFinancialRecord(when, ctx);

    then('I receive my financial record ID', () => {
      const response = ctx.latestResponse as IdResponse;
      expect(typeof response.id).toBe('number');
    });
  });

  // test('I try to create a financial record with invalid data', ({
  //   given,
  //   when,
  //   then,
  // }) => {
  //   const ctx = new TestContext<CreateFinancialRecordTestContext>();

  //   givenFinancialRecordProfileData(given, ctx);

  //   iSendARequestToCreateAFinancialRecord(when, ctx);

  //   iReceiveAnErrorWithStatusCode(then, ctx);
  // });
});
