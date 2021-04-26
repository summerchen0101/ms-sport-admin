import BasicTable from '@/components/BasicTable'
import { gameOpts } from '@/lib/options'
import { OptionType } from '@/types'
import { AgentReport } from '@/types/api/AgentReport'
import useTransfer from '@/utils/useTransfer'
import { HStack, Text } from '@chakra-ui/layout'
import Table, { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import React, { useMemo } from 'react'
import ColorText from '../ColorText'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import menu from '@/lib/menu'
import ParentTree from '../ParentTree'
import { useDataContext } from '@/context/DataContext'

const MONTHS = () => {
  const months: string[] = []
  const dateStart = moment().subtract(4, 'month')
  const dateEnd = moment()
  while (dateEnd.diff(dateStart, 'months') > 0) {
    months.push(dateStart.format('YYYY-MM'))
    dateStart.add(1, 'month')
  }
  return months
}

function TableData({ list }: { list: AgentReport[] }) {
  const { toCurrency } = useTransfer()
  const router = useRouter()
  const { parentTree } = useDataContext()
  const columns: ColumnsType<AgentReport> = useMemo(
    () => [
      {
        title: '帐号/暱称',
        fixed: true,
        render: (_, row) => {
          if (row.agent_count > 0) {
            return (
              <Link
                href={{
                  pathname: menu.report.pages.agent.path,
                  query: { ...router.query, pid: row.id },
                }}
              >
                <Text color="brand.500" as="a">
                  {row.acc}[{row.name}]
                </Text>
              </Link>
            )
          }
          return `${row.acc}[${row.name}]`
        },
      },
      {
        title: '下注笔数',
        render: (_, row) => toCurrency(row.count, 0),
      },
      {
        title: '总注额',
        render: (_, row) => toCurrency(row.amount),
      },
      {
        title: '有效注额',
        render: (_, row) => toCurrency(row.valid_amount),
      },
      {
        title: '累计输额',
        render: (_, row) => <ColorText num={row.lose_result} />,
      },
      {
        title: '累计赢额',
        render: (_, row) => <ColorText num={row.win_result} />,
      },
      {
        title: '未过帐注额',
        render: (_, row) => toCurrency(row.not_accounting_amount),
      },
      {
        title: '会员',
        children: [
          {
            title: '结果',
            render: (_, row) => <ColorText num={row.result} />,
          },
          {
            title: '退水',
            render: (_, row) => <ColorText num={row.rebate} />,
          },
          {
            title: '服务费',
            render: (_, row) => <ColorText num={row.fee} />,
          },
        ],
      },
      {
        title: '代理',
        children: [
          {
            title: '结果',
            render: (_, row) => <ColorText num={row.agent_result} />,
          },
          {
            title: '退水',
            render: (_, row) => <ColorText num={row.agent_rebate} />,
          },
          {
            title: '负担退水',
            render: (_, row) => <ColorText num={row.agent_share_rebate} />,
          },
          {
            title: '服务费',
            render: (_, row) => <ColorText num={row.agent_fee} />,
          },
        ],
      },
    ],
    [],
  )
  return (
    <>
      <HStack>
        {router?.query?.pid && (
          <TipIconButton
            label="回上页"
            icon={<HiOutlineArrowLeft />}
            onClick={() => router.back()}
            colorScheme="brand"
            bgColor="gray.600"
            mb="10px"
          />
        )}
        <ParentTree tree={parentTree} />
      </HStack>
      <BasicTable columns={columns} data={list} />
    </>
  )
}

export default TableData
