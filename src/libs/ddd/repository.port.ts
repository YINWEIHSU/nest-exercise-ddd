import { Nullable } from '@libs/types';
// 這會讓 port 與 typeorm 產生依賴，但考量應該不太會更換套件，先不要搞得太複雜
import { EntityManager } from 'typeorm';

export class Paginated<T> {
  readonly count: number;
  readonly itemCounts: number;
  readonly currentPage: number;
  readonly data: readonly T[];

  constructor(props: Paginated<T>) {
    this.count = props.count;
    this.itemCounts = props.itemCounts;
    this.currentPage = props.currentPage;
    this.data = props.data;
  }
}

export type PaginatedQueryParams = {
  itemCounts: number;
  currentPage: number;
  sortBy: string;
  order: 'asc' | 'desc';
  filters?: Partial<string>;
};

export interface RepositoryPort<Entity> {
  // insert(entity: Entity | Entity[]): Promise<void>;
  findOneById(id: string): Promise<Nullable<Entity>>;
  findAll(): Promise<Entity[]>;
  save(entity: Entity, entityManager?: EntityManager): Promise<number>;
  // findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<Entity>>;
  transaction<T>(
    handler: (entityManager: EntityManager) => Promise<T>,
  ): Promise<T>;
}
