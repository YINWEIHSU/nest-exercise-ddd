import { Nullable } from '@libs/types';

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
  // findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<Entity>>;

  // transaction<T>(handler: () => Promise<T>): Promise<T>;
}
