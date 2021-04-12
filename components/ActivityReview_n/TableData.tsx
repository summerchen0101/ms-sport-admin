import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { ActivityRecStatus, ProcessStatus } from '@/lib/enums'
import { activityRecStatusOpts } from '@/lib/options'
import { ActivityReview } from '@/types/api/ActivityReview'
import useActivityReviewService from '@/utils/services/useActivityReviewService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Tag, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiStar } from 'react-icons/hi'

function TableData({ list }: { list: ActivityReview[] }) {
  const { toDateTime } = useTransfer()
  const { fetchById, doPay } = useActivityReviewService()
  const { toOptionName, toDate, toCurrency } = useTransfer()
  const columns: ColumnsType<ActivityReview> = useMemo(
    () => [
      { title: '活动名称', render: (_, row) => row.activity.title },
      {
        title: '申请人',
        render: (_, row) => `${row.member.acc} [${row.member.name}]`,
      },
      {
        title: '金额',
        render: (_, row) => (
          <Text color="blue.500" fontWeight="bold">
            ${toCurrency(row.bonus)}
          </Text>
        ),
      },
      { title: '申请时间', render: (_, row) => toDateTime(row.created_at) },
      {
        title: '审核状态',
        render: (_, row) => {
          const colorMap = {
            [ProcessStatus.Finish]: 'green',
            [ProcessStatus.Cancel]: 'red',
          }
          return (
            <Tag
              colorScheme={colorMap[row.status]}
              variant="solid"
              borderRadius="sm"
            >
              {toOptionName(activityRecStatusOpts, row.status)}
            </Tag>
          )
        },
      },
      { title: '审核时间', render: (_, row) => toDateTime(row.confirmed_at) },
      { title: '拨款时间', render: (_, row) => toDateTime(row.paid_at) },
      {
        title: '审核',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              colorScheme="purple"
              label="审核"
              icon={<HiPencilAlt />}
              disabled={!!row.confirmed_at}
              onClick={() => fetchById(row.id)}
            />
          </HStack>
        ),
      },
      {
        title: '派彩',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              colorScheme="pink"
              label="派彩"
              icon={<HiStar />}
              onClick={() => doPay(row.id)}
              disabled={!!row.paid_at}
            />
          </HStack>
        ),
      },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
