import { Logger, Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmSubsidiaryRepositoryQueryAdapter } from './database/subsidiaryQueryRepository'
import { TypeOrmSubsidiaryEntity } from './database/typeorm/typeOrmSubsidiaryEntity'
import { SUBSIDIARY_QUERY_REPOSITORY } from './subsidiaryDiTokens'
import { SubsidiaryMapper } from './subsidiaryMapper'

import { SubsidiariesHttpController } from './queries/subsidiaries/subsidiariesHttpController'
import { SubsidiariesQueryHandler } from './queries/subsidiaries/subsidiariesQueryHandler'

const httpControllers = [SubsidiariesHttpController]

const commandHandlers: Provider[] = []

const queryHandlers: Provider[] = [SubsidiariesQueryHandler]

const eventHandlers: Provider[] = []

const mappers: Provider[] = [SubsidiaryMapper]

const repositories: Provider[] = [
  {
    provide: SUBSIDIARY_QUERY_REPOSITORY,
    useClass: TypeOrmSubsidiaryRepositoryQueryAdapter,
  },
]

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmSubsidiaryEntity]), CqrsModule],
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
export class subsidiaryModule {}
