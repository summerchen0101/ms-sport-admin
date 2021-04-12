import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { newsTypeOpts } from '@/lib/options'
import { Activity } from '@/types/api/Activity'
import useActivityService from '@/utils/services/useActivityService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch, Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'

function TableData({ list }: { list: Activity[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useActivityService()
  const { toCurrency, toDate } = useTransfer()
  const columns: ColumnsType<Activity> = useMemo(
    () => [
      { title: '活动名称', render: (_, row) => '首储1000送500' },
      { title: '审核方式', render: (_, row) => '自动审核' },
      { title: '礼金派发方式', render: (_, row) => '自动派发' },
      { title: '活动类型', render: (_, row) => '储值金额' },
      { title: '礼金类型', render: (_, row) => '按比例' },
      { title: '礼金金額/比例', render: (_, row) => '50%' },
      { title: '礼金上限', render: (_, row) => '1000' },
      { title: '出金流水倍數', render: (_, row) => '60' },
      { title: '更新时间', render: (_, row) => toDateTime(moment().unix()) },
      {
        title: '启用',
        render: (_, row) => (
          <Switch
            colorScheme="teal"
            isChecked={row.is_active}
            onChange={(e) => setActive(row.id, e.target.checked)}
          />
        ),
      },
      {
        title: '操作',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="编辑"
              icon={<HiPencilAlt />}
              colorScheme="brown"
              onClick={() => fetchById(row.id)}
            />
            <TipIconButton
              label="删除"
              icon={<HiOutlineTrash />}
              colorScheme="red"
              onClick={() => doDelete(row.id)}
            />
          </HStack>
        ),
      },
    ],
    [],
  )
  return (
    <BasicTable
      columns={columns}
      data={Array(3)
        .fill('')
        .map((t, i) => ({ id: i }))}
    />
  )
}

export default TableData
