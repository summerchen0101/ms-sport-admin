import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { AccountingStatus, DateRangeType, GameStatus } from '@/lib/enums'
import { accountingStatusOpts, gameOpts, gameStatusOpts } from '@/lib/options'
import { OptionType } from '@/types'
import { HandicapListRequest } from '@/types/api/Handicap'
import useHandicapService from '@/utils/services/useHandicapService'
import useOptionsService from '@/utils/services/useOptionsService'
import useTransfer from '@/utils/useTransfer'
import { Spacer, Stack } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import { HiSearch } from 'react-icons/hi'
import DateRangeBtns from '../DateRangeBtns'
import SearchBarContent from '../SearchBarContent'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  game_code: string
  game_status: GameStatus
  date_range: [Moment, Moment]
  accounting_status: AccountingStatus
  half_accounting_status: AccountingStatus
  sort: string
}

const sortByOpts: OptionType[] = [
  // { label: '預設', value: 'play_at' },
  { label: '開賽時間', value: 'play_at' },
  { label: '注單量', value: 'bet_count' },
  { label: '累計注額', value: 'bet_sum' },
]

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const [isSearchReady, setIsSearchReady] = useState(false)
  const router = useRouter()
  const { dateRanges } = useTransfer()
  const { fetchList } = useHandicapService()
  const { search, setSearch } = useSearchContext<HandicapListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      start_at: d.date_range?.[0].startOf('day').unix(),
      end_at: d.date_range?.[1].endOf('day').unix(),
      game_code: d.game_code ? d.game_code : undefined,
      game_status: d.game_status,
      accounting_status: d.accounting_status,
      half_accounting_status: d.half_accounting_status,
      sorts: [d.sort],
    })
  }

  // 預設搜尋
  useEffect(() => {
    form.setFieldsValue({ date_range: dateRanges[DateRangeType.Today] })
    setSearch((s) => ({
      start_at: dateRanges[DateRangeType.Today][0].unix(),
      end_at: dateRanges[DateRangeType.Today][1].unix(),
    }))
    setIsSearchReady(true)
  }, [])

  useEffect(() => {
    isSearchReady && fetchList(search)
  }, [search, isSearchReady])

  return (
    <SearchBar isOpen={visible} form={form}>
      <SearchBarContent>
        <InlineFormField name="game_code" label="球種" initialValue={0}>
          <Select options={[{ label: '全部', value: 0 }, ...gameOpts]} />
        </InlineFormField>

        <InlineFormField name="date_range" label="日期" w={['auto', 'auto']}>
          <DatePicker.RangePicker allowClear />
        </InlineFormField>
        <InlineFormField name="date_range" w={['auto', '300px']}>
          <DateRangeBtns />
        </InlineFormField>
        <InlineFormField name="game_status" label="賽事狀態" initialValue={0}>
          <Select options={[{ label: '全部', value: 0 }, ...gameStatusOpts]} />
        </InlineFormField>
        <InlineFormField
          name="accounting_status"
          label="全場結帳"
          initialValue={0}
        >
          <Select
            options={[{ label: '全部', value: 0 }, ...accountingStatusOpts]}
          />
        </InlineFormField>
        <InlineFormField
          name="half_accounting_status"
          label="半場結帳"
          initialValue={0}
        >
          <Select
            options={[{ label: '全部', value: 0 }, ...accountingStatusOpts]}
          />
        </InlineFormField>
        <InlineFormField name="sort" label="排序" initialValue="play_at">
          <Select options={sortByOpts} />
        </InlineFormField>
      </SearchBarContent>
      <Spacer />
      <TipIconButton
        label="search"
        icon={<HiSearch />}
        onClick={() => onSearch()}
        w={['100%', 'auto']}
        colorScheme="brand"
      />
    </SearchBar>
  )
}

export default PageSearchBar
