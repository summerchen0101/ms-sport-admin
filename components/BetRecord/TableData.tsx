import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { accountingStatusColorMap } from '@/lib/colorMaps'
import { AccountingStatus, Section } from '@/lib/enums'
import { accountingStatusOpts, gameOpts, sectionOpts } from '@/lib/options'
import { BetRecord } from '@/types/api/BetRecord'
import useBetRecordService from '@/utils/services/useBetRecordService'
import useHelper from '@/utils/useHelper'
import useTransfer from '@/utils/useTransfer'
import { Box, HStack, Text } from '@chakra-ui/react'
import Table, { ColumnsType } from 'antd/lib/table'
import { useRouter } from 'next/dist/client/router'
import React, { useMemo } from 'react'
import { HiOutlineArrowLeft, HiOutlineEye } from 'react-icons/hi'
import ColorText from '../ColorText'
import TableSummary from '../TableSummary'
import TableSummaryItem from '../TableSummaryItem'

function TableData({ list }: { list: BetRecord[] }) {
  const { toDateTime } = useTransfer()
  const { toOptionName, toDate, toCurrency, toEventId } = useTransfer()
  const [, setViewVisible] = usePopupContext('view')
  const { copyToClipboard } = useHelper()
  const { setViewData, betSummary } = useDataContext<BetRecord>()
  const { fetchBetRatios } = useBetRecordService()
  const router = useRouter()
  const handleLevelView = async (d: BetRecord) => {
    await fetchBetRatios(d.id)
    setViewData(d)
    setViewVisible(true)
  }
  const columns: ColumnsType<BetRecord> = useMemo(
    () => [
      {
        title: '注单编号',
        render: (_, row) => (
          <HStack>
            <Text>{row.sn}</Text>
            {/* <TipIconButton
              label="复制"
              icon={<HiOutlineClipboardCopy />}
              colorScheme="teal"
              onClick={() => copyToClipboard(row.sn)}
            /> */}
          </HStack>
        ),
      },
      {
        title: '会员名称',
        render: (_, row) => `${row.member.acc}[${row.member.name}]`,
      },
      { title: '下注时间', render: (_, row) => toDateTime(row.created_at) },
      {
        title: '归帐日',
        render: (_, row) => toDate(row.handicap.accounting_at),
      },
      {
        title: '下注项目',
        render: (_, row) => (
          <Box>
            <HStack fontWeight="bold">
              <Text color="yellow.700">#{toEventId(row.handicap.id)}</Text>
              <Text color="blue.500">
                {toOptionName(gameOpts, row.game_code)}
              </Text>
              <Text color="teal.500">{row.handicap.team_home.league_name}</Text>
              <Text color="yellow.700">
                [{toOptionName(sectionOpts, row.section_code)}] 反波胆
              </Text>
            </HStack>
            <HStack>
              <HStack spacing="3px">
                <Text>★{row.handicap.team_home.name}</Text>
                <Text>vs</Text>
                <Text>{row.handicap.team_away.name}</Text>
              </HStack>
              <Text color="red.500" d="inline">
                @{(row.odds * 100).toFixed(2)}
              </Text>{' '}
              <Text fontWeight="600">
                {row.home_point}-{row.away_point}
              </Text>
            </HStack>
          </Box>
        ),
      },
      {
        title: '结帐状态',
        render: (_, row) => {
          return (
            <Text color={accountingStatusColorMap[row.accounting_status]}>
              {toOptionName(accountingStatusOpts, row.accounting_status)}
            </Text>
          )
        },
      },
      {
        title: '比分',
        render: (_, row) => {
          if (row.section_code === Section.Full) {
            return row.handicap.accounting_status === AccountingStatus.Finish
              ? `${row.handicap.home_score}-${row.handicap.away_score}`
              : '-'
          }
          return row.handicap.half_accounting_status === AccountingStatus.Finish
            ? `${row.handicap.home_half_score}-${row.handicap.away_half_score}`
            : '-'
        },
      },
      { title: '下注金额', render: (_, row) => toCurrency(row.amount) },
      { title: '累计流水', render: (_, row) => toCurrency(row.valid_amount) },
      {
        title: '服务费',
        render: (_, row) => <ColorText num={row.fee} />,
      },
      {
        title: '退水',
        render: (_, row) => <Text>{toCurrency(row.rebate)}</Text>,
      },
      {
        title: '输赢结果',
        render: (_, row) => <ColorText num={row.result + row.fee} />,
      },
      {
        title: '占成资讯',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="查看"
              colorScheme="blue"
              icon={<HiOutlineEye />}
              onClick={() => handleLevelView(row)}
            />
          </HStack>
        ),
      },
    ],
    [],
  )
  return (
    <>
      {router?.query?.from && (
        <TipIconButton
          label="回上页"
          icon={<HiOutlineArrowLeft />}
          onClick={() => router.back()}
          colorScheme="brand"
          bgColor="gray.600"
          mb="10px"
        />
      )}
      {betSummary && (
        <TableSummary>
          <TableSummaryItem label="总笔数" num={betSummary.count} decimal={0} />
          <TableSummaryItem label="下注金额" num={betSummary.amount} />
          <TableSummaryItem label="累计流水" num={betSummary.valid_amount} />
          <TableSummaryItem label="退水">
            <ColorText num={betSummary.rebate} />
          </TableSummaryItem>
          <TableSummaryItem label="手续费">
            <ColorText num={betSummary.fee} />
          </TableSummaryItem>
          <TableSummaryItem label="输赢结果">
            <ColorText num={betSummary.result + betSummary.fee} />
          </TableSummaryItem>
        </TableSummary>
      )}

      <BasicTable
        columns={columns}
        data={list}
        summary={
          betSummary &&
          (() => {
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={7}>
                  <Text textAlign="right">跨页统计</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  {toCurrency(betSummary.amount, 0)}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  {toCurrency(betSummary.valid_amount, 0)}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  <ColorText num={betSummary.fee} />
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  <ColorText num={betSummary.rebate} />
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5}>
                  <ColorText num={betSummary.result + betSummary.fee} />
                </Table.Summary.Cell>
                <Table.Summary.Cell index={6}></Table.Summary.Cell>
              </Table.Summary.Row>
            )
          })
        }
      />
    </>
  )
}

export default TableData
