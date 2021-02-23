import { useDataContext } from '@/context/DataContext'
import { Marquee } from '@/types/api/Marquee'
import React from 'react'
import Dashboard from '../Dashboard'
import PageHeader from './PageHeader'
import PageSearchBar from './PageSearchBar'
import TableData from './TableData'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<Marquee>()

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
    </Dashboard>
  )
}

export default PageEntry
