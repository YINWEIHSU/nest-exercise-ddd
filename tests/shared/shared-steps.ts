import { ApiErrorResponse } from '@src/libs/api/api-error.response'
import { CreateFinancialRecordTestContext } from '@tests/financialRecord/financial-record-shared-steps'
import { TestContext } from '@tests/test-utils/TestContext'
import { DefineStepFunction } from 'jest-cucumber'

/**
 * Test steps that can be shared between all tests
 */

export const iReceiveAnErrorWithStatusCode = (
  then: DefineStepFunction,
  ctx: TestContext<CreateFinancialRecordTestContext>,
): void => {
  then(
    /^I receive an error "(.*)" with status code (\d+)$/,
    (errorMessage: string, statusCode: string) => {
      const apiError = ctx.latestResponse as ApiErrorResponse
      expect(apiError.statusCode).toBe(parseInt(statusCode))
      expect(apiError.error).toBe(errorMessage)
    },
  )
}
