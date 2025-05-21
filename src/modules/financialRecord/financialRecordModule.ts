import { Logger, Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FinancialRecordIsUpdatedEventHandler } from './application/event-handlers/FinancialRecordIsUpdatedEventHandler'
import { FinancialRecordIsBatchUpdatedEventHandler } from './application/event-handlers/financialRecordIsBatchUpdatedEventHandler'
import { CreateFinancialRecordHttpController } from './commands/create-financial-record/createFinancialRecordHttpController'
import { CreateFinancialRecordService } from './commands/create-financial-record/createFinancialRecordService'
import { DeleteFinancialRecordsHttpController } from './commands/delete-financial-records/deleteFinancialRecordsHttpController'
import { DeleteFinancialRecordsService } from './commands/delete-financial-records/deleteFinancialRecordsService'
import { LockFinancialRecordsHttpController } from './commands/lock-financial-records/lockFinancialRecordsHttpController'
import { LockFinancialRecordsService } from './commands/lock-financial-records/lockFinancialRecordsService'
import { UpdateFinancialRecordHttpController } from './commands/update-financial-record/updateFinancialRecordHttpController'
import { UpdateFinancialRecordService } from './commands/update-financial-record/updateFinancialRecordService'
import { UpdateFinancialRecordsInvoiceHttpController } from './commands/update-financial-records-invoice/updateFinancialRecordsInvoiceHttpController'
import { UpdateFinancialRecordsInvoiceService } from './commands/update-financial-records-invoice/updateFinancialRecordsInvoiceService'
import { UpdateFinancialRecordsVoucherHttpController } from './commands/update-financial-records-voucher/updateFinancialRecordsVoucherHttpController'
import { UpdateFinancialRecordsVoucherService } from './commands/update-financial-records-voucher/updateFinancialRecordsVoucherService'
import { TypeOrmFinancialRecordRepositoryQueryAdapter } from './database/financialRecordQueryRepository'
import { TypeOrmFinancialRecordRepositoryAdapter } from './database/financialRecordRepository'
import { TypeOrmFinancialRecordEntity } from './database/typeorm/typeOrmFinancialRecordEntity'
import { TypeOrmFinancialRecordLogEntity } from './database/typeorm/typeOrmFinancialRecordLogEntity'
import {
  FINANCIAL_RECORD_QUERY_REPOSITORY,
  FINANCIAL_RECORD_REPOSITORY,
} from './financialRecordDiTokens'
import { FinancialRecordMapper } from './financialRecordMapper'
import { FindFinancialRecordLogHttpController } from './queries/find-financial-record-log/findFinancialRecordLogHttpController'
import { FindFinancialRecordLogQueryHandler } from './queries/find-financial-record-log/findFinancialRecordLogQueryHandler'
// import { CreateFinancialRecordHttpController } from './commands/create-user/createFinancialRecordHttpController';
import { FindFinancialRecordHttpController } from './queries/find-financial-record/findFinancialRecordHttpController'
// import { CreateFinancialRecordService } from './commands/create-user/create-user.service';
import { FindFinancialRecordQueryHandler } from './queries/find-financial-record/findFinancialRecordQueryHandler'
import { FindFinancialRecordsHttpController } from './queries/find-financial-records/findFinancialRecordsHttpController'
import { FindFinancialRecordsQueryHandler } from './queries/find-financial-records/findFinancialRecordsQueryHandler'

const httpControllers = [
  CreateFinancialRecordHttpController,
  UpdateFinancialRecordHttpController,
  DeleteFinancialRecordsHttpController,
  FindFinancialRecordHttpController,
  FindFinancialRecordsHttpController,
  FindFinancialRecordLogHttpController,
  LockFinancialRecordsHttpController,
  UpdateFinancialRecordsInvoiceHttpController,
  UpdateFinancialRecordsVoucherHttpController,
]

const commandHandlers: Provider[] = [
  CreateFinancialRecordService,
  UpdateFinancialRecordService,
  DeleteFinancialRecordsService,
  LockFinancialRecordsService,
  UpdateFinancialRecordsInvoiceService,
  UpdateFinancialRecordsVoucherService,
]

const queryHandlers: Provider[] = [
  FindFinancialRecordQueryHandler,
  FindFinancialRecordsQueryHandler,
  FindFinancialRecordLogQueryHandler,
]

const eventHandlers: Provider[] = [
  FinancialRecordIsUpdatedEventHandler,
  FinancialRecordIsBatchUpdatedEventHandler,
]

const mappers: Provider[] = [FinancialRecordMapper]

const repositories: Provider[] = [
  {
    provide: FINANCIAL_RECORD_REPOSITORY,
    useClass: TypeOrmFinancialRecordRepositoryAdapter,
  },
  {
    provide: FINANCIAL_RECORD_QUERY_REPOSITORY,
    useClass: TypeOrmFinancialRecordRepositoryQueryAdapter,
  },
]

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
