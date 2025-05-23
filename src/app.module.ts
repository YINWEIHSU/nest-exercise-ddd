import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RequestContextModule } from 'nestjs-request-context';
import { CqrsModule } from '@nestjs/cqrs';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './libs/guards/authGuard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './libs/externalServices/auth/authModule';
import { databaseConfig } from './config/databaseConfig';
import { TypeOrmFinancialRecordEntity } from './modules/financialRecord/database/typeorm/typeOrmFinancialRecordEntity';
import { FinancialRecordModule } from './modules/financialRecord/financialRecordModule';
import { TypeOrmFinancialRecordLogEntity } from './modules/financialRecord/database/typeorm/typeOrmFinancialRecordLogEntity';

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
