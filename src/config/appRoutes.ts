/**
 * Application routes with its version
 * https://github.com/Sairyss/backend-best-practices#api-versioning
 */

// Root
const financialRecordRoot = 'financial-records'

// Api Versions
const v1 = 'api/v1'

export const routesV1 = {
  version: v1,
  financialRecord: {
    root: financialRecordRoot,
    getOne: `${financialRecordRoot}/:id`,
    getList: `${financialRecordRoot}`,
    log: `${financialRecordRoot}/:id/log`,
    lock: `${financialRecordRoot}/lock`,
    invoice: `${financialRecordRoot}/invoice-info`,
    voucher: `${financialRecordRoot}/voucher-number`,
  },
}
