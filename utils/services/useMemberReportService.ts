import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { useSearchContext } from '@/context/SearchContext'
import { MemberReport, MemberReportListRequest } from '@/types/api/MemberReport'
import { useToast } from '@chakra-ui/react'
import useMemberReportAPI from '../apis/useMemberReportAPI'
import useErrorHandler from '../useErrorHandler'

function useMemberReportService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setParentTree } = useDataContext<MemberReport>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  const { setSearch } = useSearchContext<MemberReportListRequest>()
  const API = useMemberReportAPI()
  const toast = useToast()

  const fetchList = async (req?: MemberReportListRequest) => {
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

export default useMemberReportService
