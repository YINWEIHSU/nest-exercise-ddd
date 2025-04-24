import { Logger, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmFinancialRecordEntity } from './database/typeorm/typeOrmFinancialRecordEntity';
import { TypeOrmUserRepositoryAdapter } from './database/financialRecordRepository';
import { TypeOrmUserRepositoryQueryAdapter } from './database/financialRecordQueryRepository';
// import { CreateFinancialRecordHttpController } from './commands/create-user/createFinancialRecordHttpController';
// import { DeleteFinancialRecordHttpController } from './commands/delete-user/delete-user.http-controller';
import { FindFinancialRecordHttpController } from './queries/find-financial-record/findFinancialRecordHttpController';
// import { CreateFinancialRecordService } from './commands/create-user/create-user.service';
// import { DeleteFinancialRecordService } from './commands/delete-user/delete-user.service';
import { FindFinancialRecordQueryHandler } from './queries/find-financial-record/findFinancialRecordQueryHandler';
import { FinancialRecordMapper } from './financialRecordMapper';
import { CqrsModule } from '@nestjs/cqrs';
import {
  FINANCIAL_RECORD_REPOSITORY,
  FINANCIAL_RECORD_QUERY_REPOSITORY,
} from './financialRecordDiTokens';

const httpControllers = [
  // CreateFinancialRecordHttpController,
  // DeleteFinancialRecordHttpController,
  FindFinancialRecordHttpController,
];

const commandHandlers: Provider[] = [
  // CreateFinancialRecordService,
  // DeleteFinancialRecordService,
];

const queryHandlers: Provider[] = [FindFinancialRecordQueryHandler];

const mappers: Provider[] = [FinancialRecordMapper];

const repositories: Provider[] = [
  {
    provide: FINANCIAL_RECORD_REPOSITORY,
    useClass: TypeOrmUserRepositoryAdapter,
  },
  {
    provide: FINANCIAL_RECORD_QUERY_REPOSITORY,
    useClass: TypeOrmUserRepositoryQueryAdapter,
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
  ],
})
export class FinancialRecordModule {}
