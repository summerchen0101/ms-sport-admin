import { MenuCategory, MenuPage } from '@/components/MenuItem'

type MenuCategoryLabel =
  | 'user'
  | 'admin'
  | 'announce'
  | 'activity'
  | 'sport'
  | 'website'
  | 'member'
  | 'block'
  | 'report'
  | 'trade'
  | 'merchant'
  | 'event'
  | 'cashflow'
  | 'affiliate'

type MenuTree = {
  [category in MenuCategoryLabel]: MenuCategory
} & {
  home: MenuPage
}

const menu: MenuTree = {
  home: { name: '首页', icon: 'HiHome', path: '/' },
  user: {
    name: '个人管理',
    icon: 'HiUser',
    path: '/user',
    menuHidden: true,
    pages: {
      profile: { name: '个人资料', path: '/user/profile', menuHidden: true },
      shadow: { name: '子帐号', path: '/user/shadow' },
    },
  },
  announce: {
    name: '公告管理',
    icon: 'HiSpeakerphone',
    path: '/announce',
    pages: {
      news: { name: '最新消息', path: '/announce/news' },
      banner: { name: '首页轮播图', path: '/announce/banner' },
      marquee: { name: '跑马灯', path: '/announce/marquee' },
      message: { name: '站内信', path: '/announce/message' },
    },
  },

  activity: {
    name: '优惠活动',
    icon: 'HiTag',
    path: '/activity',
    pages: {
      activity: { name: '活动管理', path: '/activity/manage' },
      package: {
        name: '活动行销组合',
        path: '/activity/package',
        menuHidden: true,
      },
      review: { name: '活动审核', path: '/activity/review' },
    },
  },

  member: {
    name: '会员管理',
    icon: 'HiUserGroup',
    pages: {
      member: { name: '会员列表', path: '/member/manage' },
      level: { name: '会员级别管理', path: '/member/level', menuHidden: true },
      tag: { name: '会员标籤', path: '/member/tag' },
      bank: { name: '会员银行卡', path: '/member/bank' },
      realName: { name: '实名认证', path: '/member/real-name' },
      contact: { name: '联络资料', path: '/member/contact' },
      log: { name: '会员登录纪录', path: '/member/log' },
    },
  },
  event: {
    name: '赛事相关',
    icon: 'HiLightningBolt',
    pages: {
      manage: { name: '赛事列表', path: '/event/manage' },
      betRecord: { name: '注单列表', path: '/event/bet-record' },
      accounting: {
        name: '赛事结帐',
        path: '/event/accounting',
        menuHidden: true,
      },
      monitor: { name: '赛事控盘', path: '/event/monitor' },
    },
  },
  report: {
    name: '报表查询',
    icon: 'HiChartBar',
    pages: {
      memberActivity: { name: '会员活跃情况', path: '/report/member-activity' },
      agent: { name: '代理报表', path: '/report/agent' },
      daily: { name: '日结算', path: '/report/daily' },
      revenue: { name: '营收报表', path: '/report/revenue' },
    },
  },
  affiliate: {
    name: '合营计划',
    icon: 'HiUserGroup',
    pages: {
      report: { name: '佣金绩效报表', path: '/affiliate/report' },
      profit: { name: '审核及派彩', path: '/affiliate/profit' },
      setting: { name: '合营阶级管理', path: '/affiliate/level' },
    },
  },
  trade: {
    name: '帐务纪录',
    icon: 'HiCurrencyDollar',
    pages: {
      deposit: { name: '储值纪录', path: '/trade/deposit-rec' },
      withdraw: { name: '提领纪录', path: '/trade/withdraw-rec' },
      transfer: { name: '转点纪录', path: '/trade/transfer-rec' },
      wallet: { name: '帐变纪录', path: '/trade/wallet-rec' },
      recharge: { name: '人工加扣点', path: '/trade/recharge-rec' },
    },
  },
  cashflow: {
    name: '金流设置',
    icon: 'HiCurrencyDollar',
    pages: {
      // package: { name: '支付工具', path: '/cashflow/package' },
      thirdParty: { name: '金流系統', path: '/cashflow/third-party' },
      group: { name: '轮替群组', path: '/cashflow/group' },
      merchant: { name: '金流商户', path: '/cashflow/merchant' },
      payment: { name: '支付方式', path: '/cashflow/payment' },
      currency: {
        name: '币别设置',
        path: '/cashflow/currency',
        menuHidden: true,
      },
    },
  },

  admin: {
    name: '管理员管理',
    icon: 'HiStar',
    path: '/admin',
    pages: {
      adminUser: { name: '管理员列表', path: '/admin/user' },
      adminRole: { name: '角色管理', path: '/admin/role' },
      menu: { name: '选单管理', path: '/admin/menu', menuHidden: true },
    },
  },

  block: {
    name: '黑名单管理',
    icon: 'HiExclamation',
    pages: {
      ipBlock: { name: 'IP黑名单', path: '/block/ip' },
      countryBlock: { name: '国家黑名单', path: '/block/country' },
    },
  },
  merchant: {
    name: '商户管理',
    icon: 'HiBriefcase',
    pages: {
      manage: { name: '商户列表', path: '/merchant/manage' },
    },
  },
  website: {
    name: '网站管理',
    icon: 'HiDesktopComputer',
    pages: {
      faqCategory: {
        name: '常见问题分类',
        path: '/website/faq/category',
        // menuHidden: true,
      },
      faq: { name: '常见问题', path: '/website/faq' },
      pageContent: { name: '内容管理', path: '/website/page-content' },
    },
  },

  sport: {
    name: '体育设置',
    icon: 'HiAdjustments',
    path: '/sport',
    pages: {
      country: { name: '国家管理', path: '/sport/country' },
      sport: { name: '运动管理', path: '/sport/sport' },
      game: { name: '球种管理', path: '/sport/game' },
      leagueGroup: { name: '联盟群组管理', path: '/sport/league-group' },
      league: { name: '联盟管理', path: '/sport/league' },
      team: { name: '队伍管理', path: '/sport/team' },
      teamTranslate: { name: '抓盘队伍翻译', path: '/sport/team-translate' },
      odds: { name: '赔率管理', path: '/sport/odds' },
      defaultBet: {
        name: '默认下注设置',
        path: '/sport/default-bet',
        menuHidden: true,
      },
      handicapDiff: {
        name: '盘口管理',
        path: '/sport/handicap-diff',
        menuHidden: true,
      },
    },
  },
}

export default menu
