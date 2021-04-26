import { ProcessStatus, RechargeType, WalletRecType } from '@/lib/enums'
import { DateRangeListRequest, MemberBasic } from '..'
export interface RechargeRec {
  id: number
  amount: number
  note: string
  recharge_type: RechargeType
  balance: number
  member: MemberBasic
  status: ProcessStatus

  editor: string
  created_at: number
  updated_at: number

  wallet_rec_type: WalletRecType
}

export interface RechargeRecListRequest extends DateRangeListRequest {
  acc?: string
  recharge_type?: RechargeType
  wallet_rec_type?: WalletRecType
}

export interface RechargeRecSummary {
  add_count: number
  sub_count: number
  add_sum: number
  sub_sum: number
}

export interface RechargeRecListResponse {
  list: RechargeRec[]
  summary: RechargeRecSummary
  total_count: number
  total_page: number
}

export interface RechargeRecCreateRequest {
  acc: string
  amount: number
  note: string
  recharge_type: RechargeType
}
