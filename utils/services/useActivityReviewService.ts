import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { ProcessStatus } from '@/lib/enums'
import {
  ActivityReview,
  ActivityReviewListRequest,
} from '@/types/api/ActivityReview'
import { useToast } from '@chakra-ui/react'
import useActivityReviewAPI from '../apis/useActivityReviewAPI'
import useErrorHandler from '../useErrorHandler'

function useActivityReviewService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<ActivityReview>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  const { setSearch } = useSearchContext<ActivityReviewListRequest>()
  const [, setEditVisible] = usePopupContext('editForm')
  const API = useActivityReviewAPI()
  const toast = useToast()

  const fetchList = async (req?: ActivityReviewListRequest) => {
    try {
      const res = await API.fetchAll({ page, perpage, ...req })
      setList(res.data.list)
      setTotalCount(res.data.total_count)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const fetchById = async (id: number) => {
    try {
      const res = await API.fetchById(id)
      setViewData(res.data)
      setEditVisible(true)
    } catch (err) {
      apiErrHandler(err)
    }
  }

  const setStatus = async ({
    id,
    status,
    bonus,
  }: {
    id: number
    status: ProcessStatus
    bonus?: number
  }) => {
    try {
      await API.edit(id, bonus)
      await API.status(id, status)
      setSearch((s) => ({ ...s }))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doPay = async (id: number) => {
    try {
      await API.pay(id)
      setSearch((s) => ({ ...s }))
    } catch (err) {
      apiErrHandler(err)
    }
  }

  return {
    fetchList,
    fetchById,
    setStatus,
    doPay,
  }
}

export default useActivityReviewService
