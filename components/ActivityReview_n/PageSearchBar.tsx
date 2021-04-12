import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { ProcessStatus } from '@/lib/enums'
import { newsTypeOpts, activityRecStatusOpts } from '@/lib/options'
import { ActivityReviewListRequest } from '@/types/api/ActivityReview'
import useActivityReviewService from '@/utils/services/useActivityReviewService'
import { Box, Spacer } from '@chakra-ui/react'
import { Form, Input, Select, DatePicker } from 'antd'
import moment, { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import SearchBarButtonRadios from '../SearchBarButtonRadios'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  title: string
  status: ProcessStatus
  // date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useActivityReviewService()
  const { search, setSearch } = useSearchContext<ActivityReviewListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      title: d.title,
      status: d.status,
      // start_at: d.date_range?.[0].startOf('day').unix(),
      // end_at: d.date_range?.[1].endOf('day').unix(),
    })
  }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form}>
      {/* <InlineFormField name="date_range" label="日期" w={['auto', 'auto']}>
        <DatePicker.RangePicker allowClear />
      </InlineFormField> */}
      <InlineFormField name="title" label="标题">
        <Input allowClear />
      </InlineFormField>
      <InlineFormField name="status" label="审核状态" initialValue={0}>
        <SearchBarButtonRadios<number>
          options={[{ label: '全部', value: 0 }, ...activityRecStatusOpts]}
        />
      </InlineFormField>

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
