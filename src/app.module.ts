import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RequestContextModule } from 'nestjs-request-context'
import { databaseConfig } from './config/databaseConfig'
import { AuthModule } from './libs/externalServices/auth/authModule'
import { AuthGuard } from './libs/guards/authGuard'
import { AccountingModule } from './modules/accounting/accountingModule'
import { TypeOrmFinancialRecordEntity } from './modules/financialRecord/database/typeorm/typeOrmFinancialRecordEntity'
import { TypeOrmFinancialRecordLogEntity } from './modules/financialRecord/database/typeorm/typeOrmFinancialRecordLogEntity'
import { FinancialRecordModule } from './modules/financialRecord/financialRecordModule'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.username,
      password: databaseConfig.password,
      database: databaseConfig.database,
      entities: [TypeOrmFinancialRecordEntity, TypeOrmFinancialRecordLogEntity],
      synchronize: false,
    }),
    AuthModule,
    CqrsModule,
    EventEmitterModule.forRoot(),
    RequestContextModule,
    FinancialRecordModule,
    AccountingModule,
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
export class AppModule {}
