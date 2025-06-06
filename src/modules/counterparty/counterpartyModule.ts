import { Logger, Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmCounterpartyRepositoryQueryAdapter } from './database/counterpartyQueryRepository'
import { TypeOrmCounterpartyRepositoryAdapter } from './database/counterpartyRepository'
import { TypeOrmCounterpartyEntity } from './database/typeorm/typeOrmCounterpartyEntity'
import { COUNTERPARTY_QUERY_REPOSITORY, COUNTERPARTY_REPOSITORY } from './counterpartyDiTokens'
import { CounterpartyMapper } from './counterpartyMapper'

import { CounterpartiesHttpController } from './queries/counterparties/counterpartiesHttpController'
import { CounterpartiesQueryHandler } from './queries/counterparties/counterpartiesQueryHandler'
import { CreateCounterpartyHttpController } from './commands/create-counterparty/createCounterpartyHttpController'
import { CreateCounterpartyService } from './commands/create-counterparty/createCounterpartyService'

const httpControllers = [CounterpartiesHttpController, CreateCounterpartyHttpController]

const commandHandlers: Provider[] = [CreateCounterpartyService]

const queryHandlers: Provider[] = [CounterpartiesQueryHandler]

const eventHandlers: Provider[] = []

const mappers: Provider[] = [CounterpartyMapper]

const repositories: Provider[] = [
  {
    provide: COUNTERPARTY_QUERY_REPOSITORY,
    useClass: TypeOrmCounterpartyRepositoryQueryAdapter,
  },
  {
    provide: COUNTERPARTY_REPOSITORY,
    useClass: TypeOrmCounterpartyRepositoryAdapter,
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
