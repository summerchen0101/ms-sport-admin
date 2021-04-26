import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { useSearchContext } from '@/context/SearchContext'
import {
  MemberActivity,
  MemberActivityListRequest,
} from '@/types/api/MemberActivity'
import { useToast } from '@chakra-ui/react'
import useMemberActivityAPI from '../apis/useMemberActivityAPI'
import useErrorHandler from '../useErrorHandler'

function useMemberActivityService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setParentTree } = useDataContext<MemberActivity>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  const { setSearch } = useSearchContext<MemberActivityListRequest>()
  const API = useMemberActivityAPI()
  const toast = useToast()

  const fetchList = async (req?: MemberActivityListRequest) => {
    try {
      const res = await API.fetchAll({ page, perpage, ...req })
      setList(res.data.list)
      setTotalCount(res.data.total_count)
      setParentTree(res.data.parent_tree)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  return {
    fetchList,
  }
}

export default useMemberActivityService
