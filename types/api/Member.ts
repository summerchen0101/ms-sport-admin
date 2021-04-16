import {
  AccountingType,
  BlockStatus,
  MemberType,
  RestoreType,
  Status,
} from '@/lib/enums'
import { DateRangeListRequest, MemberBasic } from '..'
import { MemberTagOption } from '../options'

export interface Member {
  id: number
  acc: string
  agent_count: number
  balance: number
  created_at: number
  editor: string
  is_active: false
  is_open_bet: false
  login_error_times: number
  login_ip: string
  logined_at: number
  member_count: number
  name: string
  shadow_count: number
  status: BlockStatus
  updated_at: number
  promo_code: string

  note: string
  member_type: MemberType
  accounting_type: AccountingType
  restore_type: RestoreType
  parent_id: number

  activity_percent: number
  fee_percent: number

  credit: number
  origin_credit: number
  vip_level: number
  ip_location: string
  is_promo: boolean
  is_real_name: boolean

  tags?: MemberTagOption[]
  real_name: string

  is_test: boolean

  promo_level: number
  is_lock_promo_level: boolean

  balance_sum: number
}

export interface BetSetting {
  game_code: string
  section_code: string
  play_code: string
  risk_percent: number
  fee_percent: number
  rebate_percent: number
  single_game_limit: number
  single_side_limit: number
  single_bet_limit: number
  single_bet_least: number
  is_open_bet: boolean

  created_at?: number
  editor?: string
  id?: number
  member?: MemberBasic
  updated_at?: number
}

export interface BetSettingEditRequest {
  id: number
  risk_percent: number
  fee_percent: number
  rebate_percent: number
  single_game_limit: number
  single_side_limit: number
  single_bet_limit: number
  single_bet_least: number
  is_open_bet: boolean
}

export type MemberWithBetSettings = Member & {
  bet_settings: BetSetting[]
}

export interface MemberListRequest extends DateRangeListRequest {
  agent_id?: number
  parent_id?: number
  member_type?: MemberType
  acc?: string
  is_active?: Status
  tag_ids?: number[]
  is_test?: number
}

export interface MemberListResponse {
  list: Member[]
  total_count: number
  total_page: number
}

export interface MemberActiveRequest {
  id: number
  is_active: boolean
}
export interface MemberStatusRequest {
  id: number
  status: BlockStatus
}

export interface BetSettingListResponse {
  list: BetSetting[]
}

export interface MemberCreateRequest {
  name: string
  acc: string
  pass: string
  note: string
  member_type: MemberType
  accounting_type: AccountingType
  restore_type: RestoreType
  parent_id: number
  is_active: boolean
  is_open_bet: boolean
  bet_settings: BetSetting[]

  is_test: boolean
}
export interface MemberEditRequest {
  id: number
  name: string
  restore_type: RestoreType
  note: string
  promo_level_id: number
  is_lock_promo_level: boolean
}
export interface MemberTagEditRequest {
  id: number
  tag_ids: number[]
}
