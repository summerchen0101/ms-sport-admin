import PageHeader from '@/components/ActivityReview_n/PageHeader'
import PageSearchBar from '@/components/ActivityReview_n/PageSearchBar'
import TableData from '@/components/ActivityReview_n/TableData'
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
