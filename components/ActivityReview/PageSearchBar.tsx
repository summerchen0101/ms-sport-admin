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
import DateRangeBtns from '../DateRangeBtns'
import SearchBarButtonRadios from '../SearchBarButtonRadios'
import SearchBarContent from '../SearchBarContent'
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
      <SearchBarContent>
        <InlineFormField
          name="date_range"
          label="申請日期"
          w={['auto', 'auto']}
        >
          <DatePicker.RangePicker allowClear />
        </InlineFormField>
        <InlineFormField name="date_range">
          <DateRangeBtns />
        </InlineFormField>
        <InlineFormField name="title" label="活動">
          <Select allowClear />
        </InlineFormField>
        <InlineFormField name="acc" label="申請人">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField
          name="confirm_status"
          label="审核状态"
          initialValue={0}
        >
          <Select
            options={[{ label: '全部', value: 0 }, ...activityRecStatusOpts]}
          />
        </InlineFormField>
        <InlineFormField
          name="accounting_status"
          label="派彩状态"
          initialValue={0}
        >
          <Select
            options={[{ label: '全部', value: 0 }, ...activityRecStatusOpts]}
          />
        </InlineFormField>
        <InlineFormField name="status" label="完成状态" initialValue={0}>
          <Select
            options={[{ label: '全部', value: 0 }, ...activityRecStatusOpts]}
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
