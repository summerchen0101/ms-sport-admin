import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { PaymentGateway } from '@/types/api/PaymentGateway'
import usePaymentGatewayService from '@/utils/services/usePaymentGatewayService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'
import { paymentTypeOpts } from '@/lib/options'

function TableData({ list }: { list: PaymentGateway[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = usePaymentGatewayService()
  const { toOptionName, toDate } = useTransfer()
  const columns: ColumnsType<PaymentGateway> = useMemo(
    () => [
      { title: '金流商户', render: (_, row) => row.merchant.name },
      {
        title: '付款方式',
        render: (_, row) => toOptionName(paymentTypeOpts, row.payment_type),
      },
      {
        title: '限额设置',
        children: [
          {
            title: '单次储值下限',
            render: (_, row) => row.single_deposit_least,
          },
          {
            title: '单次储值上限',
            render: (_, row) => row.single_deposit_limit,
          },
          {
            title: '日储值上限',
            render: (_, row) => row.deposit_limit_day,
          },
          {
            title: '週储值上限',
            render: (_, row) => row.deposit_limit_week,
          },
          {
            title: '月储值上限',
            render: (_, row) => row.deposit_limit_mon,
          },
        ],
      },
      {
        title: '手续费设置',
        children: [
          {
            title: '储值手续费(元)',
            render: (_, row) => row.deposit_fee,
          },
          {
            title: '储值手续费％',
            render: (_, row) => row.deposit_fee_percent,
          },
        ],
      },
      {
        title: '银行卡设置',
        children: [
          {
            title: '银行名称',
            render: (_, row) => '-',
          },
          {
            title: '分行名称',
            render: (_, row) => '-',
          },
          {
            title: '帐户名称',
            render: (_, row) => '-',
          },
          {
            title: '银行帐号',
            render: (_, row) => '-',
          },
        ],
      },

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
  return <BasicTable columns={columns} data={list} />
}

export default TableData
