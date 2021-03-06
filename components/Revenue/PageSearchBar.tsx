import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { MemberType, ProcessStatus } from '@/lib/enums'
import { accountingStatusOpts, gameOpts, memberTypeOpts } from '@/lib/options'
import { GameReportListRequest } from '@/types/api/GameReport'
import useGameReportService from '@/utils/services/useGameReportService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select, Checkbox, Radio } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  content: string
  date_range: [Moment, Moment]
}
const quarterOpts = [
  { label: '全部', value: 0 },
  { label: 'Q1', value: 1 },
  { label: 'Q2', value: 2 },
  { label: 'Q3', value: 3 },
  { label: 'Q4', value: 4 },
]
function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useGameReportService()
  const { search, setSearch } = useSearchContext<GameReportListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({})
  }
  useEffect(() => {
    // fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField name="year" label="年份" w="auto">
        <DatePicker picker="year" />
      </InlineFormField>
      {/* <InlineFormField name="quarter" label="季度" w="auto" initialValue={0}>
        <Radio.Group
          options={quarterOpts}
          optionType="button"
          buttonStyle="solid"
        />
      </InlineFormField> */}
      <InlineFormField
        name="game_code"
        label="球種"
        initialValue={gameOpts.map((t) => t.value)}
      >
        <Checkbox.Group options={gameOpts} />
      </InlineFormField>

      <Spacer />
      <TipIconButton
        label="search"
        icon={<HiOutlineSearch />}
        onClick={() => onSearch()}
        w={['100%', 'auto']}
        colorScheme="orange"
      />
    </SearchBar>
  )
}

export default PageSearchBar
