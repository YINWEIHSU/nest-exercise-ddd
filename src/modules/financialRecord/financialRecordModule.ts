import { Logger, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmFinancialRecordEntity } from './database/typeorm/typeOrmFinancialRecordEntity';
import { TypeOrmFinancialRecordRepositoryAdapter } from './database/financialRecordRepository';
import { TypeOrmFinancialRecordRepositoryQueryAdapter } from './database/financialRecordQueryRepository';
// import { CreateFinancialRecordHttpController } from './commands/create-user/createFinancialRecordHttpController';
// import { DeleteFinancialRecordHttpController } from './commands/delete-user/delete-user.http-controller';
import { FindFinancialRecordHttpController } from './queries/find-financial-record/findFinancialRecordHttpController';
// import { CreateFinancialRecordService } from './commands/create-user/create-user.service';
// import { DeleteFinancialRecordService } from './commands/delete-user/delete-user.service';
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

const httpControllers = [
  CreateFinancialRecordHttpController,
  // DeleteFinancialRecordHttpController,
  FindFinancialRecordHttpController,
  FindFinancialRecordsHttpController,
];

const commandHandlers: Provider[] = [
  CreateFinancialRecordService,
  // DeleteFinancialRecordService,
];

const queryHandlers: Provider[] = [
  FindFinancialRecordQueryHandler,
  FindFinancialRecordsQueryHandler,
];

const eventHandlers: Provider[] = [
  FinancialRecordIsUpdatedEventHandler,
]

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
    TypeOrmModule.forFeature([TypeOrmFinancialRecordEntity]),
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
