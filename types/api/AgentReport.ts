import { MemberType } from '@/lib/enums'
import { DateRangeListRequest, MemberBasic } from '..'
import { ParentTreeItem } from './Member'
export interface AgentReport {
  id: number
  name: string
  acc: string
  count: number
  amount: number
  valid_amount: number
  result: number
  rebate: number
  fee: number
  agent_count: number
  agent_result: number
  agent_rebate: number
  agent_fee: number
  agent_share_rebate: number

  win_result: number
  lose_result: number
  not_accounting_amount: number
}

export interface AgentReportListRequest extends DateRangeListRequest {
  acc?: string
  agent_id?: number
  is_test?: number
}

export interface AgentReportListResponse {
  list: AgentReport[]
  parent_tree: ParentTreeItem[]
  total_count: number
  total_page: number
}
