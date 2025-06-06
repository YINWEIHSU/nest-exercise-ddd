import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 移除未在 DTO 中定義的屬性
      forbidNonWhitelisted: true, // 如果存在未定義的屬性，則拋出錯誤
      transform: true, // 自動轉換有效負載為 DTO 類型
    }),
  );
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
