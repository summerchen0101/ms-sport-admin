import BasicTable from '@/components/BasicTable'
import { useDataContext } from '@/context/DataContext'
import { RechargeType } from '@/lib/enums'
import { rechargeTypeOpts } from '@/lib/options'
import { RechargeRec } from '@/types/api/RechargeRec'
import useTransfer from '@/utils/useTransfer'
import { HStack, Stack, Text } from '@chakra-ui/layout'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import React, { useMemo } from 'react'
import ColorText from '../ColorText'
import TableSummary from '../TableSummary'
import TableSummaryItem from '../TableSummaryItem'

function TableData({ list }: { list: RechargeRec[] }) {
  const { toDateTime, toOptionName, toCurrency } = useTransfer()
  const { rechargeRecSummary: summary } = useDataContext()
  const columns: ColumnsType<RechargeRec> = useMemo(
    () => [
      {
        title: '类型',
        render: (_, row) => (
          <Text
            color={
              row.recharge_type === RechargeType.Add ? 'green.500' : 'red.500'
            }
          >
            {toOptionName(rechargeTypeOpts, row.recharge_type)}
          </Text>
        ),
      },
      {
        title: '帐号/暱称',
        render: (_, row) => `${row.member.acc}[${row.member.name}]`,
      },
      {
        title: '点数',
        render: (_, row) => (
          <Text
            color={
              row.recharge_type === RechargeType.Add ? 'green.500' : 'red.500'
            }
          >
            {toCurrency(row.amount)}
          </Text>
        ),
      },
      {
        title: '余额',
        render: (_, row) => `${toCurrency(row.balance)}`,
      },
      {
        title: '备注',
        render: (_, row) => row.note,
      },

      { title: '操作时间', render: (_, row) => toDateTime(moment().unix()) },
    ],
    [],
  )
  return (
    <>
      {summary && (
        <TableSummary>
          <Stack
            direction={['column', null, 'row']}
            spacing={['10px', null, '25px']}
          >
            <Text>
              加点： <ColorText num={summary.add_sum} /> 共 {summary.add_count}{' '}
              筆
            </Text>
            <Text>
              扣点： <ColorText num={summary.sub_sum} /> 共 {summary.sub_count}{' '}
              筆
            </Text>
          </Stack>
          {/* <TableSummaryItem
            label="加点笔数"
            num={summary.add_count}
            decimal={0}
          />
          <TableSummaryItem label="加点总额">
            <ColorText num={summary.add_sum} />
          </TableSummaryItem>
          <TableSummaryItem
            label="扣點筆數"
            num={summary.sub_count}
            decimal={0}
          />
          <TableSummaryItem label="扣点总额">
            <ColorText num={summary.sub_sum} />
          </TableSummaryItem> */}
        </TableSummary>
      )}
      <BasicTable columns={columns} data={list} />
    </>
  )
}

export default TableData
