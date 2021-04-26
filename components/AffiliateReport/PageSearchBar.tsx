import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { MemberType, YesNo } from '@/lib/enums'
import { yesNoOpts } from '@/lib/options'
import { MemberReportListRequest } from '@/types/api/MemberReport'
import useMemberReportService from '@/utils/services/useMemberReportService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import moment, { Moment } from 'moment'
import { useRouter } from 'next/dist/client/router'
import { ParsedUrlQuery } from 'querystring'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import SearchBarContent from '../SearchBarContent'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  acc: string
  month: Moment
  is_test: number
  member_type: MemberType
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useMemberReportService()
  const { search, setSearch } = useSearchContext<MemberReportListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const router = useRouter()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      acc: d.acc,
      start_at: d.month?.startOf('month')?.unix(),
      end_at: d.month?.endOf('month')?.unix(),
      is_test: d.is_test,
      member_type:
        +((router.query?.type as unknown) as MemberType) || MemberType.Agent,
      [+router.query?.type === MemberType.Member ? 'parent_id' : 'agent_id']:
        +router.query?.pid || 0,
    })
  }
  useEffect(() => {
    onSearch()
  }, [router])

  useEffect(() => {
    search && fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form}>
      <SearchBarContent>
        <InlineFormField label="結算週期" name="month" initialValue={moment()}>
          <DatePicker picker="month" placeholder="請選擇週期" />
        </InlineFormField>
        <InlineFormField label="會員帳號" name="acc">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField
          name="is_test"
          label="测试帐号"
          initialValue={YesNo.No}
        >
          <Select options={[{ label: '全部', value: 0 }, ...yesNoOpts]} />
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
