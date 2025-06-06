import { Logger, Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmCounterpartyRepositoryQueryAdapter } from './database/counterpartyQueryRepository'
import { TypeOrmCounterpartyEntity } from './database/typeorm/typeOrmCounterpartyEntity'
import { COUNTERPARTY_QUERY_REPOSITORY } from './counterpartyDiTokens'
import { CounterpartyMapper } from './counterpartyMapper'

import { CounterpartiesHttpController } from './queries/counterparties/counterpartiesHttpController'
import { CounterpartiesQueryHandler } from './queries/counterparties/counterpartiesQueryHandler'

const httpControllers = [CounterpartiesHttpController]

const commandHandlers: Provider[] = []

const queryHandlers: Provider[] = [CounterpartiesQueryHandler]

const eventHandlers: Provider[] = []

const mappers: Provider[] = [CounterpartyMapper]

const repositories: Provider[] = [
  {
    provide: COUNTERPARTY_QUERY_REPOSITORY,
    useClass: TypeOrmCounterpartyRepositoryQueryAdapter,
  },
]

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmCounterpartyEntity]), CqrsModule],
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
export class counterpartyModule { }
