import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import {
  RechargeRec,
  RechargeRecCreateRequest,
  RechargeRecListRequest,
} from '@/types/api/RechargeRec'
import { useToast } from '@chakra-ui/react'
import useRechargeRecAPI from '../apis/useRechargeRecAPI'
import useErrorHandler from '../useErrorHandler'

function useRechargeRecService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setRechargeRecSummary } = useDataContext<RechargeRec>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  const { setSearch } = useSearchContext<RechargeRecListRequest>()
  const [, setEditVisible] = usePopupContext('editForm')
  const [, setCreateVisible] = usePopupContext('createForm')
  const API = useRechargeRecAPI()
  const toast = useToast()

  const fetchList = async (req?: RechargeRecListRequest) => {
    try {
      const res = await API.fetchAll({ page, perpage, ...req })
      setList(res.data.list)
      setRechargeRecSummary(res.data.summary)
      setTotalCount(res.data.total_count)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doCreate = async (req: RechargeRecCreateRequest) => {
    try {
      await API.create(req)
      setSearch((s) => ({ ...s }))
      setCreateVisible(false)
      toast({ status: 'success', title: '新增成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }

  return {
    fetchList,
    doCreate,
  }
}

export default useRechargeRecService
