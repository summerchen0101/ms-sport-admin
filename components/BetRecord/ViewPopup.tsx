import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { BetRatio } from '@/types/api/BetRatio'
import { BetRecord } from '@/types/api/BetRecord'
import { Member } from '@/types/api/Member'
import { Text, VStack } from '@chakra-ui/layout'
import { Modal } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React, { useEffect } from 'react'
import BasicTable from '../BasicTable'
import ColorText from '../ColorText'
import numeral from 'numeral'

function ViewPopup() {
  const [visible, setVisible] = usePopupContext('view')
  const { viewData, betRatios } = useDataContext<Member>()

  if (!viewData) return <></>
  const columns: ColumnsType<BetRatio> = [
    { title: '阶层', render: (_, row, index) => `第${index + 1}层` },
    {
      title: '帐号/暱称',
      render: (_, row) => `${row.agent.acc}[${row.agent.name}]`,
    },
    {
      title: '退水',
      render: (_, row) => (
        <>
          <Text>
            <ColorText num={row.rebate} />
          </Text>
          <Text color="blue.500">{row.rebate_percent}%</Text>
        </>
      ),
    },
    {
      title: '负担退水',
      render: (_, row) => (
        <>
          <Text>
            <ColorText num={row.share_rebate} />
          </Text>
          <Text color="blue.500">{row.risk_percent}%</Text>
        </>
      ),
    },
    {
      title: '服务费',
      render: (_, row) => (
        <VStack spacing="3px">
          <Text>
            <ColorText num={row.fee} />
          </Text>
          <Text color="blue.500">{row.fee_percent}%</Text>
        </VStack>
      ),
    },
    // {
    //   title: '占成',
    //   render: (_, row) => <Text color="blue.500">{row.risk_percent}%</Text>,
    // },
    // { title: '结果', render: (_, row) => <ColorText num={row.result} /> },
    {
      title: '代理结果',
      render: (_, row) => (
        <ColorText
          num={numeral(row.result + row.fee)
            .add(row.rebate)
            .add(row.share_rebate)
            .add(row.fee)
            .value()}
        />
      ),
    },
  ]
  return (
    <Modal
      title="上层代理占成资讯"
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
      width={600}
    >
      <BasicTable columns={columns} data={betRatios} />
    </Modal>
  )
}

export default ViewPopup
