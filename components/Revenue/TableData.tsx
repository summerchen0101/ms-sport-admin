import BasicTable from '@/components/BasicTable'
import { gameOpts } from '@/lib/options'
import { ProfitReport } from '@/types/api/ProfitReport'
import useTransfer from '@/utils/useTransfer'
import { Box, Text } from '@chakra-ui/layout'
import Table, { ColumnsType } from 'antd/lib/table'
import _ from 'lodash'
import moment, { Moment } from 'moment'
import React, { useMemo } from 'react'
import ColorText from '../ColorText'
const DAYS = (M: Moment) => {
  const days: string[] = []
  const dateStart = moment(M).startOf('month')
  const dateEnd = moment(M).endOf('month')
  while (dateEnd.unix() > dateStart.unix()) {
    days.push(dateStart.format('YYYY-MM-DD'))
    dateStart.add(1, 'day')
  }
  return days
}
function TableData({ list }: { list: ProfitReport[] }) {
  const { toCurrency, toOptionName } = useTransfer()
  const columns: ColumnsType<
    ProfitReport & { date: string; count: number }
  > = useMemo(
    () => [
      {
        title: '日期',
        render: (_, row) => row.date,
      },
      {
        title: '球种',
        render: (_, row) => toOptionName(gameOpts, row.game_code),
      },
      {
        title: '累计下注(笔)',
        render: (_, row) => toCurrency(row.count, 0),
      },
      {
        title: '累计注额',
        render: (_, row) => toCurrency(row.amount),
      },
      {
        title: '有效注额',
        render: (_, row) => toCurrency(row.valid_amount),
      },
      {
        title: '退水',
        render: (_, row) => toCurrency(row.rebate),
      },
      {
        title: '服务费',
        render: (_, row) => toCurrency(row.fee),
      },
      {
        title: '会员结果',
        render: (_, row) => <ColorText num={row.result + row.fee} />,
      },
    ],
    [],
  )
  return (
    <BasicTable
      rowKey="date"
      columns={columns}
      data={list}
      summary={() => {
        return (
          <Box as={Table.Summary.Row} fontWeight="bold">
            <Table.Summary.Cell index={0} colSpan={2}>
              小计
            </Table.Summary.Cell>
            {/* <Table.Summary.Cell index={1}></Table.Summary.Cell> */}
            <Table.Summary.Cell index={2}>
              {toCurrency(
                _.sumBy(list, (t) => t.count),
                0,
              )}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={3}>
              {toCurrency(_.sumBy(list, (t) => t.amount))}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={4}>
              {toCurrency(_.sumBy(list, (t) => t.valid_amount))}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={5}>
              {toCurrency(_.sumBy(list, (t) => t.rebate))}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={6}>
              {toCurrency(_.sumBy(list, (t) => t.fee))}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={7}>
              <ColorText num={_.sumBy(list, (t) => t.result + t.fee)} />
            </Table.Summary.Cell>
          </Box>
        )
      }}
    />
  )
}

export default TableData
