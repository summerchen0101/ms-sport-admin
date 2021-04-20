import Breadcrumb from '@/components/MyBreadcrumb'
import SearchButton from '@/components/SearchButton'
import { usePopupContext } from '@/context/PopupContext'
import menu from '@/lib/menu'
import { Spacer, Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import CreateButton from '../CreateButton'

function PageHeader() {
  const [searchBarVisible, setSearchBarVisible] = usePopupContext('searchBar')
  const [, setFormVisible] = usePopupContext('createForm')
  return (
    <Stack direction={['row']} alignItems="center" mb="15px">
      <Breadcrumb
        category={menu.event.name}
        current={menu.event.pages.monitor}
      />
      <Spacer />
      <Stack direction="row">
        <SearchButton
          onClick={() => setSearchBarVisible((v) => !v)}
          isOpen={searchBarVisible}
        />
        {/* <CreateButton onClick={() => setFormVisible(true)} /> */}
      </Stack>
    </Stack>
  )
}

export default PageHeader
