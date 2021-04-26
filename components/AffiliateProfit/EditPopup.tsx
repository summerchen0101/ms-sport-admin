import { useDataContext } from '@/context/DataContext'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { ProcessStatus } from '@/lib/enums'
import { AffiliateProfit } from '@/types/api/AffiliateProfit'
import { MemberReport } from '@/types/api/MemberReport'
import useAffiliateProfitService from '@/utils/services/useAffiliateProfitService'
import useTransfer from '@/utils/useTransfer'
import Icon from '@chakra-ui/icon'
import { HStack, Spacer, Text } from '@chakra-ui/layout'
import { useMediaQuery } from '@chakra-ui/media-query'
import { Tag } from '@chakra-ui/tag'
import { Button, Descriptions, Divider, Modal } from 'antd'
import React, { useEffect } from 'react'
import { BiMinus, BiPlus, BiTime, BiX } from 'react-icons/bi'
import ColorText from '../ColorText'
import ParentTree from '../ParentTree'
import { AfiiliateProfitEditData } from './TableData'
function EditPopup() {
  const { setStatus } = useAffiliateProfitService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<AfiiliateProfitEditData>()
  const { toCurrency, toDateTime, toOptionName } = useTransfer()
  const [isSmaller] = useMediaQuery('(max-width : 768px)')
  const [affiliateLevelOpts] = useOptionsContext().affiliateLevel
  const handleSubmit = async () => {
    try {
      await setStatus(viewData.id, ProcessStatus.Finish)
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = async () => {
    setVisible(false)
  }
  const handleReject = async () => {
    try {
      await setStatus(viewData.id, ProcessStatus.Cancel)
      setVisible(false)
    } catch (err) {}
  }
  if (!viewData) return <></>
  return (
    <Modal
      title="绩效审核"
      visible={visible}
      onCancel={handleCancel}
      width={700}
      footer={
        <HStack justify="flex-end">
          <Button onClick={handleCancel}>取消</Button>
          <Button type="primary" danger onClick={handleReject}>
            驳回
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            通过
          </Button>
        </HStack>
      }
    >
      <Descriptions
        labelStyle={{ width: '150px' }}
        title="基本资讯"
        bordered
        size="small"
        column={isSmaller ? 1 : 2}
      >
        <Descriptions.Item label="帐号/暱称" span={2}>
          {viewData.member.acc} [{viewData.member.name}]
        </Descriptions.Item>
        <Descriptions.Item label="阶层资讯" span={2}>
          <ParentTree tree={viewData.parent_tree} />
        </Descriptions.Item>
        <Descriptions.Item label="总会员数">
          {viewData.member_count}
        </Descriptions.Item>
        <Descriptions.Item label="下层会员数">
          {viewData.child_count}
        </Descriptions.Item>
        <Descriptions.Item label="活跃会员数">
          {viewData.mon_valid_member_count}
        </Descriptions.Item>
        <Descriptions.Item label="活跃代理数">
          {viewData.mon_valid_agent_count}
        </Descriptions.Item>
      </Descriptions>
      <Spacer my="20px" />
      <Descriptions
        labelStyle={{ width: '150px' }}
        title="个人绩效"
        bordered
        size="small"
        column={isSmaller ? 1 : 2}
      >
        {/* <Descriptions.Item label="累计储值金">
          {viewData.deposit_sum}
        </Descriptions.Item> */}

        <Descriptions.Item label="下注数">
          {toCurrency(viewData.self_bet_count)}
        </Descriptions.Item>
        <Descriptions.Item label="下注金额">
          {toCurrency(viewData.self_bet_sum)}
        </Descriptions.Item>
        <Descriptions.Item label="有效投注">
          {toCurrency(viewData.self_valid_bet_sum)}
        </Descriptions.Item>
        <Descriptions.Item label="输赢结果">
          <ColorText num={viewData.self_result} />
        </Descriptions.Item>
        <Descriptions.Item label="退水">
          <ColorText num={viewData.self_rebate} />
        </Descriptions.Item>
        <Descriptions.Item label="手续费">
          <ColorText num={viewData.self_fee} />
        </Descriptions.Item>
      </Descriptions>
      <Spacer my="20px" />
      <Descriptions
        labelStyle={{ width: '150px' }}
        title="组织绩效"
        bordered
        size="small"
        column={isSmaller ? 1 : 2}
      >
        {/* <Descriptions.Item label="累计储值金">
          {viewData.deposit_sum}
        </Descriptions.Item> */}

        <Descriptions.Item label="下注数">
          {toCurrency(viewData.bet_count)}
        </Descriptions.Item>
        <Descriptions.Item label="下注金额">
          {toCurrency(viewData.bet_sum)}
        </Descriptions.Item>
        <Descriptions.Item label="有效投注">
          {toCurrency(viewData.valid_bet_sum)}
        </Descriptions.Item>
        <Descriptions.Item label="输赢结果">
          <ColorText num={viewData.result} />
        </Descriptions.Item>
        <Descriptions.Item label="退水">
          <ColorText num={viewData.rebate} />
        </Descriptions.Item>
        <Descriptions.Item label="手续费">
          <ColorText num={viewData.fee} />
        </Descriptions.Item>
      </Descriptions>
      <Spacer my="20px" />
      <Descriptions
        labelStyle={{ width: '150px' }}
        title="本期佣金计算"
        bordered
        size="small"
        column={isSmaller ? 1 : 2}
      >
        <Descriptions.Item label="佣金等级">
          {toOptionName(affiliateLevelOpts, viewData.promo_level) || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="佣金比例">
          {viewData.fee_percent}%
        </Descriptions.Item>

        <Descriptions.Item label="派彩金额">
          <Text color="brown.500" fontSize="xl" fontWeight="600">
            {viewData.amount}
          </Text>
        </Descriptions.Item>
      </Descriptions>
      <Spacer mb="30px" />
    </Modal>
  )
}

export default EditPopup
