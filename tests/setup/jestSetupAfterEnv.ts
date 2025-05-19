import { ValidationPipe } from '@nestjs/common'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing'
import { AppModule } from '@src/app.module'
import { databaseConfig } from '@src/config/databaseConfig'
import { AuthGuard } from '@src/libs/guards/authGuard'
import { TestAuthGuard } from '@tests/test-utils/TestAuthGuard'
import { DataSource, DataSourceOptions } from 'typeorm'

// Setting up test server and utilities
const testDbConfig: DataSourceOptions = {
  type: 'mysql',
  ...databaseConfig,
  synchronize: true,
  entities: ['src/*/.entity.ts'],
}

export class TestServer {
  constructor(
    public readonly serverApplication: NestFastifyApplication,
    public readonly testingModule: TestingModule,
  ) {}

  public static async new(
    testingModuleBuilder: TestingModuleBuilder,
  ): Promise<TestServer> {
    const testingModule: TestingModule = await testingModuleBuilder.compile()

    const app: NestFastifyApplication =
      testingModule.createNestApplication<NestFastifyApplication>(
        new FastifyAdapter(),
      )

    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))

    app.enableShutdownHooks()

    await app.init()
    await app.getHttpAdapter().getInstance().ready()

    return new TestServer(app, testingModule)
  }
}

let testServer: TestServer
let pool: DataSource

export async function generateTestingApplication(): Promise<{
  testServer: TestServer
}> {
  const testServer = await TestServer.new(
    Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthGuard)
      .useClass(TestAuthGuard),
  )

  return {
    testServer,
  }
}

export function getTestServer(): TestServer {
  return testServer
}

export function getConnectionPool(): DataSource {
  return pool
}

// setup
beforeAll(async (): Promise<void> => {
  ;({ testServer } = await generateTestingApplication())
  pool = new DataSource(testDbConfig)
  await pool.initialize()
})

// cleanup
afterAll(async (): Promise<void> => {
  await pool.destroy()
  testServer.serverApplication.close()
})
