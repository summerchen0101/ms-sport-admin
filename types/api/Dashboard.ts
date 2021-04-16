export interface Dashboard {
  result: number
  today_result: number
  week_result: number
  mon_result: number
  bet_count: number
  bet_sum: number
  activity_count: number
  activity_sum: number
  withdraw_count: number
  first_withdraw_count: number
  not_first_withdraw_count: number
  withdraw_sum: number
  first_withdraw_sum: number
  not_first_withdraw_sum: number
  deposit_count: number
  first_deposit_count: number
  not_first_deposit_count: number
  deposit_sum: number
  first_deposit_sum: number
  not_first_deposit_sum: number
  register_count: number
  member_count: number
  login_count: number

  not_accounting_bet_sum: number
  member_balance_sum: number
  real_name_count: number
  bank_card_count: number

  recharge_add_count: number
  recharge_sub_count: number
  recharge_add_sum: number
  recharge_sub_sum: number
}

export interface DashboardRequest {
  start_at?: number
  end_at?: number
  is_test?: number
}
