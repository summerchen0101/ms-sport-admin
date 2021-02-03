import { MenuItemProps } from '@/components/MenuItem'

const menu: MenuItemProps[] = [
  { name: '首頁', path: '/' },
  {
    name: '管理員管理',
    icon: 'HiOutlineUser',
    children: [
      { name: '管理員列表', path: '/admin/user' },
      { name: '角色管理', path: '/admin/role' },
    ],
  },
  {
    name: '公告管理',
    icon: 'HiOutlineSpeakerphone',
    children: [
      { name: '最新消息', path: '/announce/news' },
      { name: '跑馬燈', path: '/announce/marquee' },
      { name: '站內信', path: '/announce/message' },
    ],
  },
  {
    name: '優惠活動',
    icon: 'HiOutlineStar',
    children: [
      { name: '活動管理', path: '/activity/manage' },
      { name: '活動審核', path: '/activity/review' },
    ],
  },
]

export default menu
