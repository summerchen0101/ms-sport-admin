import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { useDataContext } from '@/context/DataContext'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePopupContext } from '@/context/PopupContext'
import { AccountingType, BlockStatus, MemberType } from '@/lib/enums'
import menu from '@/lib/menu'
import { accountingTypeOpts, memberTypeOpts } from '@/lib/options'
import { Member } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import useHelper from '@/utils/useHelper'
import useTransfer from '@/utils/useTransfer'
import { InfoIcon } from '@chakra-ui/icons'
import {
  Box,
  Checkbox,
  Circle,
  HStack,
  Icon,
  Spacer,
  Stack,
  Switch,
  Tag,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Popover, Tooltip } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useMemo } from 'react'
import {
  HiCog,
  HiOutlineArrowLeft,
  HiOutlineClipboardCopy,
  HiOutlineKey,
  HiOutlineX,
  HiPencilAlt,
  HiPlus,
  HiPlusCircle,
  HiStar,
  HiX,
} from 'react-icons/hi'
import LargerNum from '../LargerNum'
import MyCheckBox from '../MyCheckBox'
import ColorTag from './ColorTag'

type MemberFields = keyof Member

const memberFilterColumns: MemberFields[] = ['agent_count', 'shadow_count']
const agentFilterColumns: MemberFields[] = ['promo_level', 'real_name']

function TableData({ list }: { list: Member[] }) {
  const {
    setActive,
    setOpenBet,
    setTest,
    setStatus,
    setRealName,
    setPromo,
    fetchById,
    fetchBetSetting,
    fetchParentBetSetting,
  } = useMemberService()
  const { toCurrency, toDateTime, toDate, toOptionName } = useTransfer()
  const { copyToClipboard } = useHelper()
  const router = useRouter()
  const pid = useMemo(() => +router.query?.pid || null, [router.query])
  const toast = useToast()
  const {
    setViewId,
    setViewData,
    setParentBetSettings,
  } = useDataContext<Member>()
  const [, setPassVisible] = usePopupContext('passForm')
  const [, setTradePassVisible] = usePopupContext('tradePassForm')
  const [, setEditVisible] = usePopupContext('editForm')
  const [, setCreateVisible] = usePopupContext('createForm')
  const [, setBetSettingVisible] = usePopupContext('betSetting')
  const [, setCreditVisible] = usePopupContext('credit')
  const [, setTagVisible] = usePopupContext('tag')
  const [affiliateLevelOpts] = useOptionsContext().affiliateLevel
  const handleCreditEdit = async (id: number) => {
    await fetchById(id)
    setCreditVisible(true)
  }
  const handlePassEdit = (id: number) => {
    setViewId(id)
    setPassVisible(true)
  }
  const handleTradePassEdit = (id: number) => {
    setViewId(id)
    setTradePassVisible(true)
  }
  const handleBetSettingEdit = async (id: number, parent_id?: number) => {
    setParentBetSettings(null)
    await fetchById(id)
    await fetchBetSetting(id)
    parent_id && (await fetchParentBetSetting(parent_id))
    setBetSettingVisible(true)
  }

  const handleEdit = async (id: number) => {
    await fetchById(id)
    setEditVisible(true)
  }
  const handleTagEdit = async (id: number) => {
    await fetchById(id)
    setTagVisible(true)
  }
  const handleCreate = async (id: number) => {
    setParentBetSettings(null)
    await Promise.all([fetchById(id), fetchParentBetSetting(id)])
    setCreateVisible(true)
  }

  const columns = useMemo(() => {
    const columnKeys =
      list?.[0]?.member_type === MemberType.Member
        ? memberFilterColumns
        : agentFilterColumns
    const _columns: ColumnsType<Member> = [
      {
        title: '帐号/暱称',
        key: 'acc',
        render: (_, row) => {
          return (
            <Stack spacing="0">
              <Text>
                {row.acc}[{row.name}]
              </Text>
              {row.member_type === MemberType.Member && (
                <HStack spacing="3px">
                  {row.tags.map((t) => (
                    <ColorTag key={t.id} tag={t} />
                  ))}
                  <Tooltip title="编辑标籤">
                    <Icon
                      as={HiCog}
                      cursor="pointer"
                      fontSize="20px"
                      color="brand.400"
                      onFocus={(e) => e.currentTarget.blur()}
                      onClick={() => handleTagEdit(row.id)}
                    />
                  </Tooltip>
                </HStack>
              )}
            </Stack>
          )
        },
      },
      {
        title: '身份',
        key: 'member_type',
        render: (_, row) => {
          if (row.member_type === MemberType.Member) {
            return row.vip_level ? `${row.vip_level}级会员` : '会员'
          }
          return toOptionName(memberTypeOpts, row.member_type)
        },
      },
      {
        title: '合营等级',
        key: 'promo_level',
        render: (_, row) =>
          toOptionName(affiliateLevelOpts, row.promo_level) || '-',
      },
      {
        title: '下层会员',
        key: 'member_count',
        render: (_, row) => {
          if (row.member_count > 0) {
            return (
              <Link
                href={{
                  pathname: menu.member.pages.member.path,
                  query: {
                    pid: row.id,
                    type: MemberType.Member,
                  },
                }}
              >
                <LargerNum num={row.member_count} />
              </Link>
            )
          }
          return toCurrency(row.member_count, 0)
        },
      },
      {
        title: '下层代理',
        key: 'agent_count',
        render: (_, row) => {
          if (row.agent_count > 0) {
            return (
              <Link
                href={{
                  pathname: menu.member.pages.member.path,
                  query: { pid: row.id, type: MemberType.Agent },
                }}
              >
                <LargerNum num={row.agent_count} />
              </Link>
            )
          } else if (row.member_type === MemberType.Member) {
            return <Icon as={HiOutlineX} />
          }
          return toCurrency(row.agent_count, 0)
        },
      },
      {
        title: '子帐号',
        key: 'shadow_count',
        render: (_, row) => toCurrency(row.shadow_count, 0),
      },
      {
        title: '帐务类型',
        key: 'accounting_type',
        render: (_, row) => {
          const colorMap = {
            [AccountingType.Cash]: 'yellow',
            [AccountingType.Credit]: 'blue',
          }
          return (
            <Tag
              size="md"
              variant="solid"
              colorScheme={colorMap[row.accounting_type]}
              borderRadius="sm"
            >
              {toOptionName(accountingTypeOpts, row.accounting_type)}
            </Tag>
          )
        },
      },
      {
        title: '余额',
        key: 'credit',
        render: (_, row) => {
          if (row.accounting_type === AccountingType.Credit) {
            return (
              <HStack>
                <Text>{toCurrency(row.credit)}</Text>
                <Spacer />
                <TipIconButton
                  label="额度调整"
                  icon={<HiPencilAlt />}
                  colorScheme="brand"
                  onClick={() => handleCreditEdit(row.id)}
                />
              </HStack>
            )
          }
          return toCurrency(row.balance)
        },
      },
      {
        title: '总会员余额',
        key: 'balance_sum',
        render: (_, row) => {
          if (row.accounting_type === AccountingType.Cash) {
            return toCurrency(row.balance_sum)
          }
          return <HiX />
        },
      },
      {
        title: '推广连结/启用',
        key: 'promo_code',
        render: (_, row) => (
          <HStack spacing="15px">
            <TipIconButton
              label="复制"
              icon={<HiOutlineClipboardCopy />}
              colorScheme="teal"
              onClick={() =>
                copyToClipboard(
                  `${process.env.memberUrl || 'https://ag88.online'}/p/${
                    row.promo_code
                  }`,
                )
              }
            />
            <MyCheckBox
              isChecked={row.is_promo}
              onChange={(e) => setPromo(row.id, e.target.checked)}
            />
          </HStack>
        ),
      },
      {
        title: '登录失败',
        key: 'login_error_times',
        render: (_, row) =>
          row.login_error_times ? `${row.login_error_times}次` : '-',
      },
      {
        title: '注册日期/登录时间',
        key: 'created_at',
        render: (_, row) => {
          if (row.login_ip) {
            return (
              <>
                <Text>{row.created_at && toDateTime(row.created_at)}</Text>
                <HStack>
                  <Text>{row.logined_at && toDateTime(row.logined_at)}</Text>
                  {row.ip_location && (
                    <Popover
                      content={
                        <Box fontWeight="600">
                          <Text>{row.login_ip}</Text>
                          <Text color="teal.500">{row.ip_location}</Text>
                        </Box>
                      }
                    >
                      <InfoIcon />
                    </Popover>
                  )}
                </HStack>
              </>
            )
          }
          return '-'
        },
      },
      {
        title: '实名认证',
        key: 'real_name',
        children: [
          {
            title: '真实姓名',
            render: (_, row) => {
              if (row.member_type === MemberType.Member) {
                return row.real_name || '-'
              }
              return <HiX />
            },
          },
          {
            title: '认证状态',
            render: (_, row) => {
              if (row.member_type === MemberType.Member) {
                return (
                  <Switch
                    colorScheme="brand"
                    isChecked={row.is_real_name}
                    onChange={(e) => setRealName(row.id, e.target.checked)}
                  />
                )
              }
              return <HiX />
            },
          },
        ],
      },
      {
        title: '启用',
        key: 'is_active',
        render: (_, row) => (
          <Switch
            colorScheme="teal"
            isChecked={row.is_active}
            onChange={(e) => setActive(row.id, e.target.checked)}
          />
        ),
      },
      {
        title: '测试帐号',
        key: 'is_test',
        render: (_, row) => (
          <Switch
            colorScheme="teal"
            isChecked={row.is_test}
            onChange={(e) => setTest(row.id, e.target.checked)}
          />
        ),
      },
      {
        title: '下注',
        key: 'is_open_bet',
        render: (_, row) => (
          <Switch
            colorScheme="teal"
            isChecked={row.is_open_bet}
            onChange={(e) => setOpenBet(row.id, e.target.checked)}
          />
        ),
      },
      {
        title: '锁定',
        key: 'is_lock',
        render: (_, row) => (
          <Switch
            colorScheme="red"
            isChecked={row.status === BlockStatus.Blocked}
            onChange={(e) =>
              setStatus(
                row.id,
                e.target.checked ? BlockStatus.Blocked : BlockStatus.Normal,
              )
            }
          />
        ),
      },
      {
        title: '密码',
        key: 'pass',
        render: (_, row) => (
          <TipIconButton
            label="密码修改"
            icon={<HiOutlineKey />}
            colorScheme="pink"
            onClick={() => handlePassEdit(row.id)}
          />
        ),
      },
      {
        title: '交易密码',
        key: 'sec_pass',
        render: (_, row) => (
          <TipIconButton
            label="交易密码修改"
            icon={<HiOutlineKey />}
            colorScheme="pink"
            onClick={() => handleTradePassEdit(row.id)}
          />
        ),
      },

      {
        title: '操作',
        key: 'control',
        fixed: 'right',
        render: (_, row) => (
          <HStack my="-4">
            {row.member_type === MemberType.Agent && (
              <TipIconButton
                label="新增下层"
                icon={<HiPlus />}
                colorScheme="teal"
                onClick={() => handleCreate(row.id)}
              />
            )}
            <TipIconButton
              label="游戏参数"
              icon={<HiStar />}
              colorScheme="purple"
              onClick={() => handleBetSettingEdit(row.id, pid)}
            />
            <TipIconButton
              label="编辑"
              icon={<HiPencilAlt />}
              colorScheme="brown"
              onClick={() => handleEdit(row.id)}
            />

            {/* <TipIconButton
                label="删除"
                icon={<HiOutlineTrash />}
                colorScheme="red"
                onClick={() => doDelete(row.id)}
              /> */}
          </HStack>
        ),
      },
    ]
    return _columns.filter((t) => !columnKeys.includes(t.key as MemberFields))
  }, [pid, list])
  return (
    <>
      {pid && (
        <TipIconButton
          label="回上页"
          icon={<HiOutlineArrowLeft />}
          onClick={() => router.back()}
          colorScheme="brand"
          bgColor="gray.600"
          mb="10px"
        />
      )}
      <BasicTable columns={columns} data={list} />
    </>
  )
}

export default TableData
