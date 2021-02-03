import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import {
  Message,
  MessageCreateRequest,
  MessageListRequest,
} from '@/types/api/Message'
import { useToast } from '@chakra-ui/react'
import useMessageAPI from '../apis/useMessageAPI'
import useErrorHandler from '../useErrorHandler'

function useMessageService() {
  const { apiErrHandler } = useErrorHandler()
  const { setList, setViewData, setViewId } = useDataContext<Message>()
  const [, setEditVisible] = usePopupContext('editForm')
  const [, setCreateVisible] = usePopupContext('createForm')
  const API = useMessageAPI()
  const toast = useToast()

  const fetchList = async (req?: MessageListRequest) => {
    try {
      const res = await API.fetchAll({ page: 1, perpage: 50, ...req })
      setList(res.data.list)
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
  const doCreate = async (req: MessageCreateRequest) => {
    try {
      await API.create(req)
      await fetchList()
      setCreateVisible(false)
      toast({ status: 'success', title: '新增成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doDelete = async (id: number) => {
    try {
      await API.removeById(id)
      await fetchList()
      toast({ status: 'success', title: '刪除成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }

  return {
    fetchList,
    fetchById,
    doCreate,
    doDelete,
  }
}

export default useMessageService
