import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import {
  AccountingType,
  DateRangeType,
  GameStatus,
  ProcessStatus,
  Section,
  SportGame,
} from '@/lib/enums'
import { accountingStatusOpts, gameOpts, sectionOpts } from '@/lib/options'
import { HandicapListRequest } from '@/types/api/Handicap'
import useHandicapService from '@/utils/services/useHandicapService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import DateRangeBtns from '../DateRangeBtns'
import SearchBarButtonRadios from '../SearchBarButtonRadios'
import SearchBarContent from '../SearchBarContent'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  game_code: string
  date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useHandicapService()
  const { search, setSearch } = useSearchContext<HandicapListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const { dateRanges } = useTransfer()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      start_at: d.date_range?.[0].startOf('day').unix(),
      end_at: d.date_range?.[1].endOf('day').unix(),
      game_code: d.game_code ? d.game_code : undefined,
      game_status: GameStatus.Preparing,
      sorts: ['play_at asc'],
    })
  }

  // 默认搜寻
  useEffect(() => {
    onSearch()
  }, [])

  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form}>
      <SearchBarContent>
        <InlineFormField
          label="球种"
          name="game_id"
          initialValue={SportGame.Soccor}
        >
          <Select options={gameOpts} />
        </InlineFormField>

        {/* <InlineFormField label="赛事编号" w={['auto']}>
          <Input />
        </InlineFormField> */}

        <InlineFormField
          name="date_range"
          label="开赛日期"
          w={['auto']}
          initialValue={dateRanges[DateRangeType.Today]}
        >
          <DatePicker.RangePicker allowClear />
        </InlineFormField>
        {/* <InlineFormField name="date_range">
          <DateRangeBtns />
        </InlineFormField> */}
        {/* <InlineFormField label="联盟">
        <Select
          mode="multiple"
          options={[
            { label: '123大联盟', value: 1 },
            { label: '非洲大象联盟', value: 2 },
          ]}
        />
      </InlineFormField> */}
        <InlineFormField
          label="场次"
          name="section_id"
          initialValue={Section.Full}
        >
          <SearchBarButtonRadios options={sectionOpts} />
        </InlineFormField>
      </SearchBarContent>

      <Spacer />
      <TipIconButton
        label="search"
        icon={<HiSearch />}
        onClick={() => onSearch()}
        w={['100%', 'auto']}
        mb="10px"
        colorScheme="brand"
      />
    </SearchBar>
  )
}

export default PageSearchBar
