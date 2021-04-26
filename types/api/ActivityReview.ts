import { ProcessStatus } from '@/lib/enums'
import { MemberBasic } from '..'
import { ParentTreeItem } from './Member'

export interface ActivityReview {
  id: number
  activity: {
    id: number
    title: string
  }
  status: number
  bonus: number
  confirmed_at: number
  created_at: number
  editor: string
  member: MemberBasic
  paid_at: number
  updated_at: number
  parent_tree: ParentTreeItem[]
}

export interface ActivityReviewListRequest {
  title?: string
  // start_at?: number
  // end_at?: number
  status?: ProcessStatus
  page?: number
  perpage?: number
}

export interface ActivityReviewListResponse {
  list: ActivityReview[]
  total_count: number
  total_page: number
}
