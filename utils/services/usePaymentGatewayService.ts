import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import {
  PaymentGateway,
  PaymentGatewayCreateRequest,
  PaymentGatewayEditRequest,
  PaymentGatewayListRequest,
} from '@/types/api/PaymentGateway'
import { useToast } from '@chakra-ui/react'
import usePaymentGatewayAPI from '../apis/usePaymentGatewayAPI'
import useErrorHandler from '../useErrorHandler'

function usePaymentGatewayService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<PaymentGateway>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  const { setSearch } = useSearchContext<PaymentGatewayListRequest>()
  const [, setEditVisible] = usePopupContext('editForm')
  const [, setCreateVisible] = usePopupContext('createForm')
  const API = usePaymentGatewayAPI()
  const toast = useToast()

  const fetchList = async (req?: PaymentGatewayListRequest) => {
    if (!req?.id) return
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
  const setActive = async (id: number, is_active: boolean) => {
    try {
      await API.active({ id, is_active })
      setSearch((s) => ({ ...s }))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doCreate = async (req: PaymentGatewayCreateRequest) => {
    try {
      await API.create(req)
      setSearch((s) => ({ ...s }))
      setCreateVisible(false)
      toast({ status: 'success', title: '新增成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doEdit = async (req: PaymentGatewayEditRequest) => {
    try {
      await API.edit(req)
      setSearch((s) => ({ ...s }))
      setEditVisible(false)
      toast({ status: 'success', title: '修改成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }

  const doDelete = async (id: number) => {
    try {
      await API.removeById(id)
      setSearch((s) => ({ ...s }))
      toast({ status: 'success', title: '刪除成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }

  return {
    fetchList,
    fetchById,
    setActive,
    doCreate,
    doEdit,
    doDelete,
  }
}

export default usePaymentGatewayService