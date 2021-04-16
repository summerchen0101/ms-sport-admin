import { useDataContext } from '@/context/DataContext'
import { DateRangeType } from '@/lib/enums'
import menu from '@/lib/menu'
import useTransfer from '@/utils/useTransfer'
import { Accordion } from '@chakra-ui/accordion'
import { SimpleGrid, Spacer, Stack } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React, { useCallback } from 'react'
import {
  BiArrowFromBottom,
  BiArrowToBottom,
  BiArrowToTop,
  BiDollar,
  BiFootball,
  BiGift,
  BiLayer,
  BiLogIn,
  BiUser,
  BiUserPlus,
} from 'react-icons/bi'
import {
  HiOutlineLightningBolt,
  HiOutlineUserGroup,
  HiOutlineIdentification,
} from 'react-icons/hi'
import { RiBankCardLine } from 'react-icons/ri'
import Dashboard from '../Dashboard'
import MyAccordionItem from './MyAccordionItem'
import PageSearchBar from './PageSearchBar'
import StatItem from './StatItem'

const PageEntry: React.FC = () => {
  const { dashboardInfo } = useDataContext()
  const router = useRouter()
  const { dateRanges, toDateTime } = useTransfer()
  const numToColor = useCallback((num: number) => {
    return num > 0 ? 'green' : num < 0 ? 'red' : 'gray'
  }, [])
  return (
    <Dashboard>
      <PageSearchBar />
      <Accordion
        defaultIndex={[0, 1, 2, 3, 4, 5, 6]}
        allowMultiple
        maxW="full"
        overflowX="auto"
      >
        <SimpleGrid spacing="3" columns={[1, null, null, 2]}>
          <MyAccordionItem title="未審核項目" icon={BiLayer}>
            <SimpleGrid spacing="4" columns={[1, 2]}>
              <StatItem
                color="brown"
                label="實名未審"
                num={dashboardInfo?.real_name_count}
                icon={HiOutlineIdentification}
                onClick={() =>
                  router.push({
                    pathname: menu.member.pages.realName.path,
                  })
                }
              />
              <StatItem
                color="brown"
                label="銀行卡未審"
                num={dashboardInfo?.bank_card_count}
                icon={RiBankCardLine}
                onClick={() =>
                  router.push({
                    pathname: menu.member.pages.bank.path,
                  })
                }
              />
            </SimpleGrid>
          </MyAccordionItem>
          <MyAccordionItem title="人工加扣点" icon={BiLayer}>
            <SimpleGrid spacing="4" columns={[1, 2]}>
              <StatItem
                isSearch
                color="pink"
                label="加点累计"
                num={dashboardInfo?.recharge_add_sum}
                icon={BiArrowToBottom}
                onClick={() =>
                  router.push({
                    pathname: menu.trade.pages.recharge.path,
                  })
                }
              />
              <StatItem
                isSearch
                color="pink"
                label="扣点累计"
                num={dashboardInfo?.recharge_sub_sum}
                icon={BiArrowToTop}
                onClick={() =>
                  router.push({
                    pathname: menu.trade.pages.recharge.path,
                  })
                }
              />
            </SimpleGrid>
          </MyAccordionItem>
          <MyAccordionItem title="输赢结果" icon={BiDollar}>
            <SimpleGrid spacing="4" columns={[1, 2]}>
              <StatItem
                color={numToColor(dashboardInfo?.result)}
                isSearch
                label="累计输赢"
                num={dashboardInfo?.result}
                icon={BiDollar}
                decimal={2}
                onClick={() => router.push(menu.report.pages.agent.path)}
              />
              <StatItem
                color={numToColor(dashboardInfo?.today_result)}
                label="当日输赢"
                num={dashboardInfo?.today_result}
                icon={BiDollar}
                decimal={2}
                onClick={() =>
                  router.push({
                    pathname: menu.report.pages.agent.path,
                    query: {
                      start: dateRanges[DateRangeType.Today]?.[0].unix(),
                      end: dateRanges[DateRangeType.Today]?.[1].unix(),
                    },
                  })
                }
              />
              <StatItem
                color={numToColor(dashboardInfo?.week_result)}
                label="本週输赢"
                num={dashboardInfo?.week_result}
                icon={BiDollar}
                decimal={2}
                onClick={() =>
                  router.push({
                    pathname: menu.report.pages.agent.path,
                    query: {
                      start: dateRanges[DateRangeType.ThisWeek]?.[0].unix(),
                      end: dateRanges[DateRangeType.ThisWeek]?.[1].unix(),
                    },
                  })
                }
              />
              <StatItem
                color={numToColor(dashboardInfo?.mon_result)}
                label="本月输赢"
                num={dashboardInfo?.mon_result}
                icon={BiDollar}
                decimal={2}
                onClick={() =>
                  router.push({
                    pathname: menu.report.pages.agent.path,
                    query: {
                      start: dateRanges[DateRangeType.ThisMonth]?.[0].unix(),
                      end: dateRanges[DateRangeType.ThisMonth]?.[1].unix(),
                    },
                  })
                }
              />
            </SimpleGrid>
          </MyAccordionItem>

          <MyAccordionItem title="充提累计" icon={BiLayer}>
            <SimpleGrid spacing="4" columns={[1, 2]}>
              <StatItem
                isSearch
                color="blue"
                label="累计充值"
                num={dashboardInfo?.deposit_sum}
                icon={BiArrowToBottom}
              />
              <StatItem
                isSearch
                color="blue"
                label="首次充值(笔)"
                num={dashboardInfo?.first_deposit_count}
                icon={BiArrowToBottom}
              />
              <StatItem
                isSearch
                color="blue"
                label="累计提领"
                num={dashboardInfo?.withdraw_sum}
                icon={BiArrowFromBottom}
                onClick={() =>
                  router.push({
                    pathname: menu.trade.pages.withdraw.path,
                  })
                }
              />
              <StatItem
                isSearch
                color="blue"
                label="首次提领(笔)"
                num={dashboardInfo?.first_withdraw_count}
                icon={BiArrowFromBottom}
              />
            </SimpleGrid>
          </MyAccordionItem>
          <MyAccordionItem title="投注状况" icon={BiFootball}>
            <SimpleGrid spacing="4" columns={[1, 2]}>
              <StatItem
                isSearch
                color="purple"
                label="注单数量"
                num={dashboardInfo?.bet_count}
                icon={HiOutlineLightningBolt}
                onClick={() =>
                  router.push({
                    pathname: menu.event.pages.betRecord.path,
                  })
                }
              />
              <StatItem
                isSearch
                color="purple"
                label="累计注额"
                num={dashboardInfo?.bet_sum}
                icon={HiOutlineLightningBolt}
                onClick={() =>
                  router.push({
                    pathname: menu.event.pages.betRecord.path,
                  })
                }
              />
              <StatItem
                color="purple"
                label="未结注额"
                num={dashboardInfo?.not_accounting_bet_sum}
                icon={HiOutlineUserGroup}
              />
            </SimpleGrid>
          </MyAccordionItem>
          <MyAccordionItem title="会员统计" icon={BiUser}>
            <SimpleGrid spacing="4" columns={[1, 2]}>
              <StatItem
                color="orange"
                label="总会员数"
                num={dashboardInfo?.member_count}
                icon={HiOutlineUserGroup}
                onClick={() =>
                  router.push({
                    pathname: menu.report.pages.memberActivity.path,
                  })
                }
              />
              <StatItem
                isSearch
                color="orange"
                label="注册人数"
                num={dashboardInfo?.register_count}
                icon={BiUserPlus}
                onClick={() =>
                  router.push({
                    pathname: menu.report.pages.memberActivity.path,
                  })
                }
              />
              <StatItem
                isSearch
                color="orange"
                label="登录人数"
                num={dashboardInfo?.login_count}
                icon={BiLogIn}
                onClick={() =>
                  router.push({
                    pathname: menu.report.pages.memberActivity.path,
                  })
                }
              />
              <StatItem
                color="orange"
                label="会员余额"
                num={dashboardInfo?.member_balance_sum}
                icon={HiOutlineUserGroup}
              />
            </SimpleGrid>
          </MyAccordionItem>
          <MyAccordionItem title="优惠活动" icon={BiGift}>
            <SimpleGrid spacing="4" columns={[1, 2]}>
              <StatItem
                isSearch
                color="teal"
                label="优惠申请(笔)"
                num={dashboardInfo?.activity_count}
                icon={BiDollar}
                onClick={() =>
                  router.push({
                    pathname: menu.activity.pages.review.path,
                  })
                }
              />
              <StatItem
                isSearch
                color="teal"
                label="彩金派发"
                num={dashboardInfo?.activity_sum}
                icon={BiDollar}
                onClick={() =>
                  router.push({
                    pathname: menu.activity.pages.review.path,
                  })
                }
              />
            </SimpleGrid>
          </MyAccordionItem>
        </SimpleGrid>
      </Accordion>
    </Dashboard>
  )
}

export default PageEntry
