import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { ActivityRecStatus, ProcessStatus } from '@/lib/enums'
import { activityRecStatusOpts } from '@/lib/options'
import { ActivityReview } from '@/types/api/ActivityReview'
import useActivityReviewService from '@/utils/services/useActivityReviewService'
import useTransfer from '@/utils/useTransfer'
import { Button, HStack, Tag, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiStar } from 'react-icons/hi'

function TableData({ list }: { list: ActivityReview[] }) {
  const { toDateTime } = useTransfer()
  const { fetchById, doPay } = useActivityReviewService()
  const { toOptionName, toDate, toCurrency } = useTransfer()
  const columns: ColumnsType<ActivityReview> = useMemo(
    () => [
      { title: '申请时间', render: (_, row) => toDateTime(row.created_at) },
      {
        title: '申请人',
        render: (_, row) => `${row.member.acc} [${row.member.name}]`,
      },
      { title: '活动名称', render: (_, row) => row.activity.title },

      {
        title: '审核',
        children: [
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
          {
            title: '审核时间/审核人',
            render: (_, row) => (
              <>
                <Text>{toDateTime(row.confirmed_at)}</Text>
                <Text>{row.editor}</Text>
              </>
            ),
          },
          {
            title: '审核',
            render: (_, row) => (
              <Button colorScheme="purple" size="sm" borderRadius="sm" h="30px">
                审核
              </Button>
            ),
          },
        ],
      },
      {
        title: '派彩',
        children: [
          {
            title: '派彩金额',
            render: (_, row) => (
              <Text color="pink.500" fontWeight="bold" fontSize="md">
                ${toCurrency(row.bonus)}
              </Text>
            ),
          },
          {
            title: '派彩状态',
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
          {
            title: '派彩时间/派彩人',
            render: (_, row) => (
              <>
                <Text>{toDateTime(row.paid_at)}</Text>
                <Text>{row.editor}</Text>
              </>
            ),
          },
          {
            title: '派彩',
            render: (_, row) => (
              <Button colorScheme="pink" size="sm" borderRadius="sm" h="30px">
                派彩
              </Button>
            ),
          },
        ],
      },
      {
        title: '完成状态',
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
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
