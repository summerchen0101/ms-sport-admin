import PageHeader from '@/components/League/PageHeader'
import TableData from '@/components/League/TableData'
import { useDataContext } from '@/context/DataContext'
import { League, LeagueListRequest } from '@/types/api/League'
import useLeagueService from '@/utils/services/useLeagueService'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'
import PageSearchBar from './PageSearchBar'

const PageEntry: React.FC = () => {
  const { fetchGameOptions } = useOptionsService()
  const { fetchList } = useLeagueService()
  const { list, search } = useDataContext<League, LeagueListRequest>()

  useEffect(() => {
    fetchGameOptions()
  }, [])

  useEffect(() => {
    fetchList({ ...search })
  }, [search])

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <EditPopup />
      <CreatePopup />
    </Dashboard>
  )
}

export default PageEntry
