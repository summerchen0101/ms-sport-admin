import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { CashflowMerchant } from '@/types/api/CashflowMerchant'
import useCashflowMerchantService from '@/utils/services/useCashflowMerchantService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch, Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'
import { useOptionsContext } from '@/context/OptionsContext'
import { useRouter } from 'next/dist/client/router'
import menu from '@/lib/menu'

function TableData({ list }: { list: CashflowMerchant[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, setWithdraw } = useCashflowMerchantService()
  const { toOptionName, toDate } = useTransfer()
  const [thirdPartyOpts] = useOptionsContext().thirdParty
  const router = useRouter()
  const [cashflowGroupOpts] = useOptionsContext().cashflowGroup
  const columns: ColumnsType<CashflowMerchant> = useMemo(
    () => [
      { title: '排序', render: (_, row) => row.sort },
      { title: '名称', render: (_, row) => row.name },
      {
        title: '金流系统',
        render: (_, row) => toOptionName(thirdPartyOpts, row.sys_code),
      },
      {
        title: '轮替群组',
        render: (_, row) => toOptionName(cashflowGroupOpts, row.group_code),
      },
      // {
      //   title: '轮替资讯',
      //   children: [
      //     {
      //       title: '总入点上限 / 目前累计',
      //       render: (_, row) => (
      //         <HStack>
      //           <Text>100,000 / 80,123</Text>
      //           <TipIconButton
      //             label="清空"
      //             icon={<HiOutlineTrash />}
      //             colorScheme="purple"
      //           />
      //         </HStack>
      //       ),
      //     },
      //     { title: '总累计金额', render: (_, row) => '1280,300' },
      //     { title: '总轮替次数', render: (_, row) => '212 次' },
      //   ],
      // },
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
        title: '代付',
        render: (_, row) => (
          <Switch
            colorScheme="teal"
            isChecked={row.is_withdraw}
            onChange={(e) => setWithdraw(row.id, e.target.checked)}
          />
        ),
      },
      {
        title: '线下',
        render: (_, row) => (
          <Switch
            colorScheme="teal"
            // isChecked={row.is_withdraw}
            // onChange={(e) => setWithdraw(row.id, e.target.checked)}
          />
        ),
      },
      {
        title: '支付方式',
        render: (_, row) => (
          <TipIconButton
            label="编辑"
            icon={<HiPencilAlt />}
            colorScheme="pink"
            onClick={() =>
              router.push({
                pathname: menu.cashflow.pages.payment.path,
                query: { merchant_id: row.id },
              })
            }
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
            {/* <TipIconButton
              label="删除"
              icon={<HiOutlineTrash />}
              colorScheme="red"
              onClick={() => doDelete(row.id)}
            /> */}
          </HStack>
        ),
      },
    ],
    [thirdPartyOpts, cashflowGroupOpts],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
