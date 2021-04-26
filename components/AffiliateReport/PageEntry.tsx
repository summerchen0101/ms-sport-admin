import { useDataContext } from '@/context/DataContext'
import { MemberReport } from '@/types/api/MemberReport'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import EditPopup from './EditPopup'
import PageHeader from './PageHeader'
import PageSearchBar from './PageSearchBar'
import TableData from './TableData'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<MemberReport>()
  const { fetchAffiliateLevelOptions } = useOptionsService()

  useEffect(() => {
    fetchAffiliateLevelOptions()
  }, [])

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <Paginator mt="3" />
      <EditPopup />
    </Dashboard>
  )
}

export default PageEntry
