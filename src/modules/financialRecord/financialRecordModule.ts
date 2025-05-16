import { Logger, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmFinancialRecordEntity } from './database/typeorm/typeOrmFinancialRecordEntity';
import { TypeOrmFinancialRecordRepositoryAdapter } from './database/financialRecordRepository';
import { TypeOrmFinancialRecordRepositoryQueryAdapter } from './database/financialRecordQueryRepository';
// import { CreateFinancialRecordHttpController } from './commands/create-user/createFinancialRecordHttpController';
import { FindFinancialRecordHttpController } from './queries/find-financial-record/findFinancialRecordHttpController';
// import { CreateFinancialRecordService } from './commands/create-user/create-user.service';
import { FindFinancialRecordQueryHandler } from './queries/find-financial-record/findFinancialRecordQueryHandler';
import { FindFinancialRecordsQueryHandler } from './queries/find-financial-records/findFinancialRecordsQueryHandler';
import { FinancialRecordMapper } from './financialRecordMapper';
import { CqrsModule } from '@nestjs/cqrs';
import {
  FINANCIAL_RECORD_REPOSITORY,
  FINANCIAL_RECORD_QUERY_REPOSITORY,
} from './financialRecordDiTokens';
import { FindFinancialRecordsHttpController } from './queries/find-financial-records/findFinancialRecordsHttpController';
import { CreateFinancialRecordHttpController } from './commands/create-financial-record/createFinancialRecordHttpController';
import { CreateFinancialRecordService } from './commands/create-financial-record/createFinancialRecordService';
import { FinancialRecordIsUpdatedEventHandler } from './application/event-handlers/FinancialRecordIsUpdatedEventHandler';
import { UpdateFinancialRecordHttpController } from './commands/update-financial-record/updateFinancialRecordHttpController';
import { UpdateFinancialRecordService } from './commands/update-financial-record/updateFinancialRecordService';
import { TypeOrmFinancialRecordLogEntity } from './database/typeorm/typeOrmFinancialRecordLogEntity';
import { FindFinancialRecordLogHttpController } from './queries/find-financial-record-log/findFinancialRecordLogHttpController';
import { FindFinancialRecordLogQueryHandler } from './queries/find-financial-record-log/findFinancialRecordLogQueryHandler';
import { LockFinancialRecordsHttpController } from './commands/lock-financial-records/lockFinancialRecordsHttpController';
import { LockFinancialRecordsService } from './commands/lock-financial-records/lockFinancialRecordsService';
import { FinancialRecordIsBatchUpdatedEventHandler } from './application/event-handlers/financialRecordIsBatchUpdatedEventHandler';
import { UpdateFinancialRecordsInvoiceHttpController } from './commands/update-financial-records-invoice/updateFinancialRecordsInvoiceHttpController';
import { UpdateFinancialRecordsInvoiceService } from './commands/update-financial-records-invoice/updateFinancialRecordsInvoiceService';
import { UpdateFinancialRecordsVoucherHttpController } from './commands/update-financial-records-voucher/updateFinancialRecordsVoucherHttpController';
import { UpdateFinancialRecordsVoucherService } from './commands/update-financial-records-voucher/updateFinancialRecordsVoucherService';
import { DeleteFinancialRecordsHttpController } from './commands/delete-financial-records/deleteFinancialRecordsHttpController';
import { DeleteFinancialRecordsService } from './commands/delete-financial-records/deleteFinancialRecordsService';

const httpControllers = [
  CreateFinancialRecordHttpController,
  UpdateFinancialRecordHttpController,
  DeleteFinancialRecordsHttpController,
  FindFinancialRecordHttpController,
  FindFinancialRecordsHttpController,
  FindFinancialRecordLogHttpController,
  LockFinancialRecordsHttpController,
  UpdateFinancialRecordsInvoiceHttpController,
  UpdateFinancialRecordsVoucherHttpController
];

const commandHandlers: Provider[] = [
  CreateFinancialRecordService,
  UpdateFinancialRecordService,
  DeleteFinancialRecordsService,
  LockFinancialRecordsService,
  UpdateFinancialRecordsInvoiceService,
  UpdateFinancialRecordsVoucherService
];

const queryHandlers: Provider[] = [
  FindFinancialRecordQueryHandler,
  FindFinancialRecordsQueryHandler,
  FindFinancialRecordLogQueryHandler
];

const eventHandlers: Provider[] = [FinancialRecordIsUpdatedEventHandler, FinancialRecordIsBatchUpdatedEventHandler];

const mappers: Provider[] = [FinancialRecordMapper];

const repositories: Provider[] = [
  {
    provide: FINANCIAL_RECORD_REPOSITORY,
    useClass: TypeOrmFinancialRecordRepositoryAdapter,
  },
  {
    provide: FINANCIAL_RECORD_QUERY_REPOSITORY,
    useClass: TypeOrmFinancialRecordRepositoryQueryAdapter,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeOrmFinancialRecordEntity,
      TypeOrmFinancialRecordLogEntity,
    ]),
    CqrsModule,
  ],
  controllers: [...httpControllers],
  providers: [
    Logger,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
    ...eventHandlers,
  ],
  exports: [...repositories],
})
export class FinancialRecordModule {}
