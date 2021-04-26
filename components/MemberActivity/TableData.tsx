import BasicTable from '@/components/BasicTable'
import { useDataContext } from '@/context/DataContext'
import menu from '@/lib/menu'
import { MemberActivity } from '@/types/api/MemberActivity'
import useTransfer from '@/utils/useTransfer'
import { HStack, Text } from '@chakra-ui/layout'
import { ColumnsType } from 'antd/lib/table'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import ParentTree from '../ParentTree'
import TipIconButton from '../TipIconButton'

function TableData({ list }: { list: MemberActivity[] }) {
  const { toCurrency } = useTransfer()
  const router = useRouter()
  const { parentTree } = useDataContext()
  const columns: ColumnsType<MemberActivity> = useMemo(
    () => [
      {
        title: '帐号/暱称',
        fixed: true,
        render: (_, row) => {
          if (row.agent_count > 0) {
            return (
              <Link
                href={{
                  pathname: menu.report.pages.memberActivity.path,
                  query: { pid: row.id },
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
        title: '首次充值(笔)',
        render: (_, row) => toCurrency(row.first_deposit_count, 0),
      },
      {
        title: '首次充值加总(元)',
        render: (_, row) => toCurrency(row.first_deposit_sum),
      },
      {
        title: '再次充值(笔)',
        render: (_, row) => toCurrency(row.not_first_deposit_count, 0),
      },
      {
        title: '再次充值加总(元)',
        render: (_, row) => toCurrency(row.not_first_deposit_sum),
      },
      {
        title: '总充值(笔)',
        render: (_, row) => toCurrency(row.deposit_count, 0),
      },
      {
        title: '总充值加总(元)',
        render: (_, row) => toCurrency(row.deposit_sum),
      },
      {
        title: '首次提现(笔)',
        render: (_, row) => toCurrency(row.first_withdraw_count, 0),
      },
      {
        title: '首次提现加总(元)',
        render: (_, row) => toCurrency(row.first_withdraw_sum),
      },
      {
        title: '再次提现(笔)',
        render: (_, row) => toCurrency(row.not_first_withdraw_count, 0),
      },
      {
        title: '再次提现加总(元)',
        render: (_, row) => toCurrency(row.not_first_withdraw_sum),
      },
      {
        title: '总提现(笔)',
        render: (_, row) => toCurrency(row.withdraw_count, 0),
      },
      {
        title: '总提现加总(元)',
        render: (_, row) => toCurrency(row.withdraw_sum),
      },
      {
        title: '总登录人数',
        render: (_, row) => toCurrency(row.login_count, 0),
      },
      {
        title: '注册人数',
        render: (_, row) => toCurrency(row.register_count, 0),
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
