import PageHeader from '@/components/Member/PageHeader'
import PageSearchBar from '@/components/Member/PageSearchBar'
import TableData from '@/components/Member/TableData'
import { useDataContext } from '@/context/DataContext'
import { Member } from '@/types/api/Member'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import BetSettingEditPopup from './BetSettingEditPopup'
import CreatePopup from './CreatePopup'
import CreditPopup from './CreditPopup'
import EditPopup from './EditPopup'
import PasswordPopup from './PasswordPopup'
import TagPopup from './TagPopup'
import TradePasswordPopup from './TradePasswordPopup'
import ViewPopup from './ViewPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<Member>()
  const { fetchTagOptions, fetchAffiliateLevelOptions } = useOptionsService()

  useEffect(() => {
    Promise.all([fetchAffiliateLevelOptions(), fetchTagOptions()])
  }, [])
  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <Paginator mt="3" />
      <TagPopup />
      <ViewPopup />
      <CreatePopup />
      <EditPopup />
      <PasswordPopup />
      <TradePasswordPopup />
      <BetSettingEditPopup />
      <CreditPopup />
    </Dashboard>
  )
}

export default PageEntry
