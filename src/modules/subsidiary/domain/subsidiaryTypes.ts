export interface SubsidiaryProps {
  name: string
  isEnable: boolean
}

// 用於查詢條件的介面
export interface SubsidiaryFilterProps {
  name?: string
  isEnable?: boolean
  createdAfter?: Date
  createdBefore?: Date
}
