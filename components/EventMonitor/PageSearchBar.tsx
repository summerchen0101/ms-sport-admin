import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { AccountingType, ProcessStatus, SportGame } from '@/lib/enums'
import { accountingStatusOpts, gameOpts } from '@/lib/options'
import { MarqueeListRequest } from '@/types/api/Marquee'
import useMarqueeService from '@/utils/services/useMarqueeService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  content: string
  date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useMarqueeService()
  const { search, setSearch } = useSearchContext<MarqueeListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      content: d.content,
      start_at: d.date_range?.[0].unix(),
      end_at: d.date_range?.[1].unix(),
    })
  }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField label="球種">
        <Select defaultValue={SportGame.Soccor} options={gameOpts} />
      </InlineFormField>
      {/* <InlineFormField label="聯盟">
        <Select
          mode="multiple"
          options={[
            { label: '123大聯盟', value: 1 },
            { label: '非洲大象聯盟', value: 2 },
          ]}
        />
      </InlineFormField> */}
      <InlineFormField name="date_range" label="開賽日期" w={['auto']}>
        <DatePicker.RangePicker allowClear />
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
