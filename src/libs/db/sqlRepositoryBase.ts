import { AggregateRoot } from '@libs/ddd'
import { Mapper } from '@libs/ddd'
import { RepositoryPort } from '@libs/ddd'
import { ConflictException } from '@libs/exceptions'
import { EventEmitter2 } from '@nestjs/event-emitter'
import {
  DataSource,
  EntityManager,
  Equal,
  FindOptionsWhere,
  In,
  QueryFailedError,
  Repository,
} from 'typeorm'
import { LoggerPort } from '../ports/logger.port'
import { ObjectLiteral } from '../types'

export abstract class RepositoryBase<
  Aggregate extends AggregateRoot<any>,
  DbModel extends ObjectLiteral,
> implements RepositoryPort<Aggregate>
{
  protected readonly dataSource: DataSource
  protected abstract getRepository(): Repository<DbModel>
  protected abstract getEntityTarget(): new () => DbModel

  protected constructor(
    dataSource: DataSource,
    protected readonly mapper: Mapper<Aggregate, DbModel>,
    protected readonly eventEmitter: EventEmitter2,
    protected readonly logger: LoggerPort,
  ) {
    this.dataSource = dataSource
  }

  async findOneById(id: string): Promise<Aggregate | null> {
    const repository = this.getRepository()
    const entity = await repository.findOne({
      where: { id: Equal(id) } as unknown as FindOptionsWhere<DbModel>,
    })
    return entity ? this.mapper.toDomain(entity) : null
  }

  async findAll(): Promise<Aggregate[]> {
    const repository = this.getRepository()
    const entities = await repository.find()
    return entities.map((entity) => this.mapper.toDomain(entity))
  }

  async findByIds(ids: string[]): Promise<Aggregate[]> {
    const repository = this.getRepository()
    const entities = await repository.findBy({
      id: In(ids),
    } as unknown as FindOptionsWhere<DbModel>)
    return entities.map((entity) => this.mapper.toDomain(entity))
  }

  async save(
    entity: Aggregate,
    entityManager?: EntityManager,
  ): Promise<number> {
    const record = this.mapper.toPersistence(entity)
    const recordToSave = { ...record }

    if (!this.isIdExist(recordToSave.id)) {
      delete recordToSave.id
    }

    let result: DbModel
    if (entityManager) {
      const repository = entityManager.getRepository<DbModel>(
        this.getEntityTarget(),
      )
      result = await repository.save(recordToSave)
    } else {
      const repository = this.getRepository()
      result = await repository.save(recordToSave)
    }

    // prevent db lock
    setImmediate(() => {
      entity
        .publishEvents(this.logger, this.eventEmitter)
        .catch((err) => this.logger.error('Error publishing events', err))
    })
    return result.id as number
  }
  /**
   * 批量保存實體
   * @param entities 實體數組
   * @param entityManager 可選的 EntityManager 實例
   * @returns 保存的實體 ID 數組
   */
  async batchSave(
    entities: Aggregate[],
    entityManager?: EntityManager,
  ): Promise<number[]> {
    const records = entities.map((entity) => this.mapper.toPersistence(entity))

    const repository = entityManager
      ? entityManager.getRepository<DbModel>(this.getEntityTarget())
      : this.getRepository()

    const savedRecords = await repository.save(records)

    const firstEntity = entities[0]
    // prevent db lock,執行事件發佈
    setImmediate(() => {
      firstEntity
        .publishEvents(this.logger, this.eventEmitter)
        .catch((err) => this.logger.error('Error publishing events', err))
    })

    return savedRecords.map((record) => record.id as number)
  }

  async transaction<T>(
    callback: (transactionalEntityManager: EntityManager) => Promise<T>,
  ): Promise<T> {
    try {
      return await this.dataSource.transaction<T>(
        async (transactionalEntityManager) => {
          return await callback(transactionalEntityManager)
        },
      )
    } catch (error) {
      if (error instanceof QueryFailedError) {
        this.logger.error('Database transaction failed', { error })

        if (
          error.message.includes('duplicate') ||
          error.message.includes('unique constraint')
        ) {
          throw new ConflictException('資料已存在')
        }
      }
      throw error
    }
  }

  async insert(
    entity: Aggregate,
    entityManager?: EntityManager,
  ): Promise<number> {
    const record = this.mapper.toPersistence(entity)
    const recordToInsert = { ...record }

    delete recordToInsert.id

    let result: DbModel
    if (entityManager) {
      const repository = entityManager.getRepository<DbModel>(
        this.getEntityTarget(),
      )
      // 先創建一個新的實體
      const newEntity = repository.create(recordToInsert)
      // 然後保存它
      result = await repository.save(newEntity)
    } else {
      const repository = this.getRepository()
      const newEntity = repository.create(recordToInsert)
      result = await repository.save(newEntity)
    }

    // prevent db lock
    setImmediate(() => {
      entity
        .publishEvents(this.logger, this.eventEmitter)
        .catch((err) => this.logger.error('Error publishing events', err))
    })
    return result.id as number
  }

  protected isIdExist(id: any): boolean {
    return !(
      id === undefined ||
      id === null ||
      (typeof id === 'number' && isNaN(id))
    )
  }

  // async findAllPaginated(
  //   params: PaginatedQueryParams,
  // ): Promise<Paginated<Aggregate>> {
  //   const [entities, count] = await this.repository.findAndCount();

  //   const domainEntities = entities.map((entity) =>
  //     this.mapper.toDomain(entity),
  //   );
  //   return new Paginated({
  //     data: domainEntities,
  //     count,
  //     limit: params.limit,
  //     page: params.page,
  //   });
  // }

  /**
   * Inserts an entity to a database
   * (also publishes domain events and waits for completion)
   */
  // async insert(entity: Aggregate | Aggregate[]): Promise<void> {
  //   const entities = Array.isArray(entity) ? entity : [entity];

  //   const records = entities.map((e) => this.mapper.toPersistence(e));

  //   try {
  //     await this.writeQuery(async () => {
  //       await this.repository.save(records);
  //     }, entities);
  //   } catch (error) {
  //     if (
  //       error instanceof QueryFailedError &&
  //       (error as any).code === 'ER_DUP_ENTRY'
  //     ) {
  //       this.logger.debug(
  //         `[${RequestContextService.getRequestId()}] Duplicate entry: ${(error as any).message}`,
  //       );
  //       throw new ConflictException('Record already exists', error);
  //     }
  //     throw error;
  //   }
  // }

  /**
   * Utility method for write queries when you need to mutate an entity.
   * Executes entity validation, publishes events,
   * and does some debug logging.
   * For read queries use `this.pool` directly
   */
  // protected async writeQuery<T>(
  //   handler: () => Promise<T>,
  //   entity: Aggregate | Aggregate[],
  // ): Promise<T> {
  //   const entities = Array.isArray(entity) ? entity : [entity];
  //   entities.forEach((entity) => entity.validate());
  //   const entityIds = entities.map((e) => e.id);

  //   this.logger.debug(
  //     `[${RequestContextService.getRequestId()}] writing ${
  //       entities.length
  //     } entities to "${this.repository.metadata.tableName}" table: ${entityIds}`,
  //   );

  //   const result = await handler();

  //   await Promise.all(
  //     entities.map((entity) =>
  //       entity.publishEvents(this.logger, this.eventEmitter),
  //     ),
  //   );
  //   return result;
  // }

  /**
   * Get appropriate repository instance.
   * If global request transaction is started,
   * returns a repository from transaction.
   */
  // protected getRepository(): Repository<DbModel> {
  //   const queryRunner =
  //     RequestContextService.getTransactionConnection() as QueryRunner;
  //   if (queryRunner) {
  //     return queryRunner.manager.getRepository(this.repository.target);
  //   }
  //   return this.repository;
  // }

  /**
   * Exists method to check if an entity exists by id
   */
  // async exists(id: string): Promise<boolean> {
  //   const count = await this.repository.count({ where: { id } as any });
  //   return count > 0;
  // }
}
