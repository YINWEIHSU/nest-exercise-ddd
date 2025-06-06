import { Logger, Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import {
  MAIN_ACCOUNT_QUERY_REPOSITORY,
  SUB_ACCOUNT_QUERY_REPOSITORY,
} from './accountingDiTokens'
import { TypeOrmMainAccountRepositoryQueryAdapter } from './database/mainAccountQueryRepository'
import { TypeOrmSubAccountRepositoryQueryAdapter } from './database/subAccountQueryRepository'
import { TypeOrmMainAccountEntity } from './database/typeorm/typeOrmMainAccountEntity'
import { TypeOrmSubAccountEntity } from './database/typeorm/typeOrmSubAccountEntity'
import { MainAccountMapper } from './mainAccountMapper'
import { FindMainAccountsHttpController } from './queries/find-main-accounts/findMainAccountsHttpController'
import { FindMainAccountsQueryHandler } from './queries/find-main-accounts/findMainAccountsQueryHandler'
import { FindSubAccountsHttpController } from './queries/find-sub-accounts/findSubAccountsHttpController'
import { FindSubAccountsQueryHandler } from './queries/find-sub-accounts/findSubAccountsQueryHandler'

const httpControllers = [
  FindMainAccountsHttpController,
  FindSubAccountsHttpController,
]

const commandHandlers: Provider[] = []

const queryHandlers: Provider[] = [
  FindMainAccountsQueryHandler,
  FindSubAccountsQueryHandler,
]

const eventHandlers: Provider[] = []

const mappers: Provider[] = [MainAccountMapper]

const repositories: Provider[] = [
  {
    provide: MAIN_ACCOUNT_QUERY_REPOSITORY,
    useClass: TypeOrmMainAccountRepositoryQueryAdapter,
  },
  {
    provide: SUB_ACCOUNT_QUERY_REPOSITORY,
    useClass: TypeOrmSubAccountRepositoryQueryAdapter,
  },
]

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeOrmMainAccountEntity,
      TypeOrmSubAccountEntity,
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
export class AccountingModule {}
