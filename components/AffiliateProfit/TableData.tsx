import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { MemberType, ProcessStatus, RewardProcess } from '@/lib/enums'
import menu from '@/lib/menu'
import { processStatusOpts, rewardProcessOpts } from '@/lib/options'
import {
  AffiliateProfit,
  AffiliateProfitListRequest,
} from '@/types/api/AffiliateProfit'
import { ParentTreeItem } from '@/types/api/Member'
import { MemberReport } from '@/types/api/MemberReport'
import useMemberReportAPI from '@/utils/apis/useMemberReportAPI'
import useMemberReportService from '@/utils/services/useMemberReportService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Tag, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { HiOutlineArrowLeft, HiPencilAlt } from 'react-icons/hi'

export type AfiiliateProfitEditData = AffiliateProfit &
  MemberReport & { parent_tree: ParentTreeItem[] }

function TableData({ list }: { list: AffiliateProfit[] }) {
  const { toDateTime } = useTransfer()
  const { setViewData } = useDataContext<AfiiliateProfitEditData>()
  const [, setReviewVisible] = usePopupContext('editForm')
  const { fetchAll } = useMemberReportAPI()
  const { search, setSearch } = useSearchContext<AffiliateProfitListRequest>()
  const router = useRouter()
  const handleReview = async (data: AffiliateProfit) => {
    const res = await fetchAll({
      start_at: moment(search?.accounting_date).startOf('month').unix(),
      end_at: moment(search?.accounting_date).endOf('month').unix(),
      acc: data.member.acc,
      member_type: MemberType.Member,
      page: 1,
      perpage: 1,
    })
    setViewData({
      ...data,
      ...res.data.list[0],
      parent_tree: res.data.parent_tree,
    })
    setReviewVisible(true)
  }
  const { toOptionName, toDate, toCurrency } = useTransfer()
  const columns: ColumnsType<AffiliateProfit> = useMemo(
    () => [
      {
        title: '帐号/暱称',
        render: (_, row) => {
          if (row.child_count > 0) {
            return (
              <Link
                href={{
                  pathname: menu.affiliate.pages.profit.path,
                  query: { pid: row.member.id },
                }}
              >
                <Text color="brand.500" textDecor="underline" as="a">
                  {row.member.acc}[{row.member.name}]
                </Text>
              </Link>
            )
          }
          return `${row.member.acc}[${row.member.name}]`
        },
      },

      {
        title: '结算週期',
        render: (_, row) => row.accounting_date,
      },
      {
        title: '手续费%',
        render: (_, row) => <Text fontWeight="bold">{row.fee_percent}%</Text>,
        align: 'center',
      },
      {
        title: '总派发金额',
        render: (_, row) => (
          <Text fontWeight="bold" color="blue.500">
            {toCurrency(row.fee_profit)}
          </Text>
        ),
        align: 'center',
      },
      {
        title: '下线派发',
        render: (_, row) => (
          <Text fontWeight="bold" color="orange.500">
            {toCurrency(row.amount)}
          </Text>
        ),
        align: 'center',
      },

      {
        title: '审核状态',
        render: (_, row) => {
          const colorMap = {
            [ProcessStatus.Finish]: 'green',
            [ProcessStatus.Cancel]: 'red',
          }
          return (
            <Tag
              colorScheme={colorMap[row.confirm_status]}
              variant="solid"
              borderRadius="sm"
            >
              {toOptionName(processStatusOpts, row.confirm_status)}
            </Tag>
          )
        },
      },
      {
        title: '派彩状态',
        render: (_, row) => {
          const colorMap = {
            [RewardProcess.Finish]: 'green',
            [RewardProcess.Pending]: 'red',
          }
          return (
            <Tag
              colorScheme={colorMap[row.pay_status]}
              variant="solid"
              borderRadius="sm"
            >
              {toOptionName(rewardProcessOpts, row.pay_status)}
            </Tag>
          )
        },
      },
      {
        title: '审核/拨款时间',
        render: (_, row) => (
          <>
            <Text>{toDateTime(row.confirmed_at)}</Text>
            <Text>{toDateTime(row.paid_at)}</Text>
          </>
        ),
      },
      {
        title: '审核',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              colorScheme="purple"
              label="审核"
              icon={<HiPencilAlt />}
              disabled={!!row.confirmed_at}
              onClick={() => handleReview(row)}
            />
          </HStack>
        ),
      },
    ],
    [],
  )
  return (
    <>
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
      <BasicTable columns={columns} data={list} />
    </>
  )
}

export default TableData
