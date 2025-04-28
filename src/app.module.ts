import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RequestContextModule } from 'nestjs-request-context';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/databaseConfig';
import { TypeOrmFinancialRecordEntity } from './modules/financialRecord/database/typeorm/typeOrmFinancialRecordEntity';
import { FinancialRecordModule } from './modules/financialRecord/financialRecordModule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.username,
      password: databaseConfig.password,
      database: databaseConfig.database,
      entities: [TypeOrmFinancialRecordEntity],
      synchronize: true,
    }),
    CqrsModule,
    EventEmitterModule.forRoot(),
    RequestContextModule,
    FinancialRecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
