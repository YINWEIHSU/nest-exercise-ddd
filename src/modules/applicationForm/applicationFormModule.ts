import { Logger, Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmApplicationFormRepositoryQueryAdapter } from './database/applicationFormQueryRepository'
import { TypeOrmApplicationFormEntity } from './database/typeorm/typeOrmApplicationFormEntity'
import { APPLICATION_FORM_QUERY_REPOSITORY } from './applicationFormDiTokens'
import { ApplicationFormMapper } from './applicationFormMapper'

import { ApplicationFormsHttpController } from './queries/applicationForms/applicationFormsHttpController'
import { ApplicationFormsQueryHandler } from './queries/applicationForms/applicationFormsQueryHandler'

const httpControllers = [ApplicationFormsHttpController]

const commandHandlers: Provider[] = []

const queryHandlers: Provider[] = [ApplicationFormsQueryHandler]

const eventHandlers: Provider[] = []

const mappers: Provider[] = [ApplicationFormMapper]

const repositories: Provider[] = [
  {
    provide: APPLICATION_FORM_QUERY_REPOSITORY,
    useClass: TypeOrmApplicationFormRepositoryQueryAdapter,
  },
]

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmApplicationFormEntity]), CqrsModule],
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
export class applicationFormModule { }
