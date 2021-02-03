import PageEntry from '@/components/Country/PageEntry'
import DataProvider from '@/context/DataContext'
import PopupProvider from '@/context/PopupContext'
import React from 'react'

function country() {
  return (
    <DataProvider>
      <PopupProvider>
        <PageEntry />
      </PopupProvider>
    </DataProvider>
  )
}

export default country
