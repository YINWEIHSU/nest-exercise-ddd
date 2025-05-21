import { PaginatedQueryParams } from './repository.port'

/**
 * Base class for regular queries
 */
export abstract class QueryBase {}

/**
 * Base class for paginated queries
 */
export abstract class PaginatedQueryBase extends QueryBase {
  itemCounts: number
  offset: number
  sortBy: string
  order: 'asc' | 'desc'
  currentPage: number

  constructor(props: PaginatedParams<PaginatedQueryBase>) {
    super()
    this.itemCounts = props.itemCounts || 20
    this.offset = props.currentPage ? props.currentPage * this.itemCounts : 0
    this.currentPage = props.currentPage || 0
    this.sortBy = props.sortBy || 'created_at'
    this.order = props.order || 'desc'
  }
}

// Paginated query parameters
export type PaginatedParams<T> = Omit<
  T,
  'itemCounts' | 'offset' | 'sortBy' | 'order' | 'currentPage'
> &
  Partial<Omit<PaginatedQueryParams, 'offset'>>
