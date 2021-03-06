export class ResponseBase<T> {
  code: number
  data: T
}

export class BaseListResponse<T> {
  list: T[]
  total_count: number
  total_page: number
}

export interface BaseListRequest {
  page?: number
  perpage?: number
}

export interface DateRangeRequest {
  start_at: number
  end_at: number
}

export type DateRangeListRequest = BaseListRequest & DateRangeRequest

export interface Pagination {
  total_count: number
  total_page: number
}

export interface MemberBasic {
  acc: string
  id: number
  name: string
}

export interface OptionBasic {
  id: number
  name: string
}

export interface OptionType {
  label: string
  value: number | string
}
