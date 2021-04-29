import PageHeader from '@/components/ActivityReview/PageHeader'
import PageSearchBar from '@/components/ActivityReview/PageSearchBar'
import TableData from '@/components/ActivityReview/TableData'
import { useDataContext } from '@/context/DataContext'
import { ActivityReview } from '@/types/api/ActivityReview'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<ActivityReview>()

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
