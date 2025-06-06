import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RequestContextModule } from 'nestjs-request-context'
import { databaseConfig } from './config/databaseConfig'
import { AuthModule } from './libs/externalServices/auth/authModule'
import { AuthGuard } from './libs/guards/authGuard'
import { TypeOrmFinancialRecordEntity } from './modules/financialRecord/database/typeorm/typeOrmFinancialRecordEntity'
import { TypeOrmFinancialRecordLogEntity } from './modules/financialRecord/database/typeorm/typeOrmFinancialRecordLogEntity'
import { FinancialRecordModule } from './modules/financialRecord/financialRecordModule'
import { TypeOrmSubsidiaryEntity } from './modules/subsidiary/database/typeorm/typeOrmSubsidiaryEntity'
import { subsidiaryModule } from './modules/subsidiary/subsidiaryModule'
import { TypeOrmApplicationFormEntity } from './modules/applicationForm/database/typeorm/typeOrmApplicationFormEntity'
import { applicationFormModule } from './modules/applicationForm/applicationFormModule'
import { TypeOrmCounterpartyEntity } from './modules/counterparty/database/typeorm/typeOrmCounterpartyEntity'
import { counterpartyModule } from './modules/counterparty/counterpartyModule'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.username,
      password: databaseConfig.password,
      database: databaseConfig.database,
      entities: [
        TypeOrmFinancialRecordEntity,
        TypeOrmFinancialRecordLogEntity,
        TypeOrmSubsidiaryEntity,
        TypeOrmApplicationFormEntity,
        TypeOrmCounterpartyEntity
      ],
      synchronize: false,
    }),
    AuthModule,
    CqrsModule,
    EventEmitterModule.forRoot(),
    RequestContextModule,
    FinancialRecordModule,
    subsidiaryModule,
    applicationFormModule,
    counterpartyModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useExisting: AuthGuard,
    },
    AuthGuard,
  ],
})
export class AppModule { }
