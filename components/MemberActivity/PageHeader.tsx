import Breadcrumb from '@/components/MyBreadcrumb'
import SearchButton from '@/components/SearchButton'
import { usePopupContext } from '@/context/PopupContext'
import menu from '@/lib/menu'
import { Spacer, Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'

function PageHeader() {
  const [searchBarVisible, setSearchBarVisible] = usePopupContext('searchBar')
  return (
    <Stack direction={['row']} alignItems="center" mb="15px">
      <Breadcrumb
        category={menu.report.name}
        current={menu.report.pages.memberActivity}
      />
      <Spacer />
      <Stack direction="row">
        <SearchButton
          onClick={() => setSearchBarVisible((v) => !v)}
          isOpen={searchBarVisible}
        />
      </Stack>
    </Stack>
  )
}

export default PageHeader
