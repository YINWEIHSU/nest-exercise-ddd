/**
 * Application routes with its version
 * https://github.com/Sairyss/backend-best-practices#api-versioning
 */

// Root
const financialRecordRoot = 'financial-records';

// Api Versions
const v1 = 'api/v1';

export const routesV1 = {
  version: v1,
  financialRecord: {
    root: financialRecordRoot,
    getOne: `${financialRecordRoot}/:id`,
    getList: `${financialRecordRoot}`,
  },
};
