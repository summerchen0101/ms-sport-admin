export enum Protocal {
  Http = 'http://',
  Https = 'https://',
}
export enum Status {
  ON = 1,
  OFF = 2,
}
export enum YesNo {
  Yes = 1,
  No = 2,
}

export enum Device {
  PC = 1,
  Mobile = 2,
}
export enum IPBlockType {
  White = 1,
  Black = 2,
}

export enum ProcessStatus {
  Pending = 1,
  Running = 2,
  Finish = 3,
  Cancel = 4,
}

export enum RewardProcess {
  Pending = 1,
  Finish = 2,
}

export enum ActivityRecStatus {
  Applying = 1,
  Recieve = 2,
  Finish = 3,
  Reject = 4,
  Paid = 5,
}

export enum AccountingStatus {
  Pending = 1,
  Running = 2,
  Finish = 3,
  Cancel = 4,
}

export enum UsdtType {
  TRC20 = 1,
  ERC20 = 2,
  OMNI = 3,
}

export enum WalletType {
  USDT = 1,
  Balance = 2,
}

export enum BlockStatus {
  Normal = 1, // 正常
  Blocked = 2, // 鎖定
}

export enum IssueStatus {
  Processing = 1,
  Readed = 2,
  Finished = 3,
}
export enum IssueType {
  Game = 1,
  Trade = 2,
  Team = 3,
  User = 4,
  Other = 5,
}

export enum NewsType {
  System = 1,
  Game = 2,
  Activity = 3,
}

export enum MemberType {
  Member = 1,
  Agent = 2,
}

export enum PlatformType {
  Admin = 1,
  Agent = 2,
  Member = 3,
}

export enum AccountingType {
  Cash = 1,
  Credit = 2,
}

export enum RestoreType {
  NoRollback = 1,
  Daily = 2,
  Weekly = 3,
}

export enum ConfirmStatus {
  Confirmed = 1,
  Processing = 2,
}

export enum Section {
  Full = 'F',
  FirstHalf = 'FH',
}

export enum Play {
  NCS = 'NCS',
  Total = 'OU',
  Spread = 'H',
}

// 大小 OU
// 抢首分 FG
// 让分 H
// 和局 D
// 抢尾分 LG
// 独赢 PK
// 单双 OE
// 一输二赢 OPFH
// 波胆 CS
// 反波胆 NCS

export enum GameStatus {
  Live = 1,
  Preparing = 2,
  Finished = 3,
  Determining = 4,
  Canceled = 5,
  Postpone = 6,
}

export enum SportGame {
  Soccor = 'SC',
  Basball = 'BSB',
}

export enum RechargeType {
  Add = 1,
  Subtract = 2,
}
export enum WalletRecType {
  Deposit = 1,
  Manual = 2,
  Withdraw = 3,
  Bet = 4,
  BetCancel = 5,
  BetResult = 6,
  AccountingFix = 7,
  Rebate = 8,
  Transfer = 9,
  Activity = 10,
}

export enum DateRangeType {
  Today = 1,
  Yesterday = 2,
  ThisWeek = 3,
  LastWeek = 4,
  ThisMonth = 5,
  LastMonth = 6,
  Tomorrow = 7,
}

export enum AutoOddsType {
  Handicap = 1,
  Odds = 2,
}

export enum ActivityType {
  Recharge = 1,
  Betting = 2,
  LoginTimes = 3,
}

export enum PaymentType {
  NetBank = 1,
  CreditCard = 2,
  IBON = 3,
  FAMI = 4,
  LIFE = 5,
  OK = 6,
  WeChat = 7,
  AliPay = 8,
  CornerPay = 9,
  Line = 10,
  ApplePay = 11,
  AndroidPay = 12,
}
