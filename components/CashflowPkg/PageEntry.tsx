import PageHeader from './PageHeader'
import PageSearchBar from './PageSearchBar'
import TableData from './TableData'
import { useDataContext } from '@/context/DataContext'
import { CashflowPkg } from '@/types/api/CashflowPkg'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<CashflowPkg>()

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <Paginator mt="3" />
      <EditPopup />
      <CreatePopup />
    </Dashboard>
  )
}

export default PageEntry