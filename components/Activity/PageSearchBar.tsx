import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import {
  activityTypeOpts,
  newsTypeOpts,
  processStatusOpts,
} from '@/lib/options'
import { ActivityListRequest } from '@/types/api/Activity'
import useActivityService from '@/utils/services/useActivityService'
import { Box, Spacer } from '@chakra-ui/react'
import { Form, Input, Select, DatePicker } from 'antd'
import moment, { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import SearchBarContent from '../SearchBarContent'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  title: string
  process_status: number
  date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useActivityService()
  const { search, setSearch } = useSearchContext<ActivityListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      title: d.title,
      process_status: +d.process_status,
      start_at: d.date_range?.[0].startOf('day').unix(),
      end_at: d.date_range?.[1].endOf('day').unix(),
    })
  }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form}>
      <SearchBarContent>
        <InlineFormField name="title" label="活动名称">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField name="process_status" label="类型" initialValue={0}>
          <Box
            as={Select}
            options={[{ label: '全部', value: 0 }, ...activityTypeOpts]}
          />
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
