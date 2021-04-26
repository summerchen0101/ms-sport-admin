import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useDataContext } from '@/context/DataContext'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { Team, TeamListRequest } from '@/types/api/Team'
import useOptionsService from '@/utils/services/useOptionsService'
import useTeamService from '@/utils/services/useTeamService'
import { Box, Spacer } from '@chakra-ui/layout'
import { Form, Select } from 'antd'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  game_code: string
  league_id: number
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { setList } = useDataContext<Team>()
  const { setSearch, search } = useSearchContext<TeamListRequest>()
  const { fetchLeagueOptions } = useOptionsService()
  const { fetchList } = useTeamService()
  const [gameOpts] = useOptionsContext().game
  const [leagueOpts, setLeagueOpts] = useOptionsContext().league
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    setSearch({ league_id: d.league_id })
  }
  const handleGameChanged = (game_code: string) => {
    setLeagueOpts([])
    setList([])
    fetchLeagueOptions(game_code)
    form.resetFields(['league_id'])
  }

  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form}>
      <InlineFormField
        name="game_code"
        label="球种"
        rules={[{ required: true }]}
      >
        <Select
          options={gameOpts}
          placeholder="请选择"
          onChange={handleGameChanged}
        />
      </InlineFormField>
      <InlineFormField
        name="league_id"
        label="联盟"
        rules={[{ required: true }]}
      >
        <Box
          as={Select}
          options={leagueOpts}
          placeholder="请选择"
          showSearch
          optionFilterProp="label"
          minW={['auto', null, '400px']}
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
