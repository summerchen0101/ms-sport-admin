import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { BlockStatus } from '@/lib/enums'
import {
  BetSetting,
  BetSettingEditRequest,
  Member,
  MemberCreateRequest,
  MemberEditRequest,
  MemberListRequest,
  MemberTagEditRequest,
  MemberWithBetSettings,
} from '@/types/api/Member'
import { useToast } from '@chakra-ui/react'
import useMemberAPI from '../apis/useMemberAPI'
import useErrorHandler from '../useErrorHandler'

function useMemberService() {
  const { apiErrHandler } = useErrorHandler()
  const {
    setList,
    setViewData,
    setBetSettings,
    setParentBetSettings,
    setParentTree,
  } = useDataContext<Member>()
  const { setTotalCount, page, perpage } = usePaginateContext()
  const { setSearch } = useSearchContext<MemberListRequest>()
  const [, setEditVisible] = usePopupContext('editForm')
  const [, setCreateVisible] = usePopupContext('createForm')
  const [, setPassVisible] = usePopupContext('passForm')
  const [, setTradePassVisible] = usePopupContext('tradePassForm')
  const [, setTagVisible] = usePopupContext('tag')
  const API = useMemberAPI()
  const toast = useToast()

  const fetchList = async (req?: MemberListRequest) => {
    if (!req?.member_type) return
    try {
      const res = await API.fetchAll({ page, perpage, ...req })
      setList(res.data.list)
      setTotalCount(res.data.total_count)
      setParentTree(res.data.parent_tree)
    } catch (err) {
      apiErrHandler(err)
    }
  }

  const fetchBetSetting = async (id: number) => {
    try {
      const res = await API.fetchBetSetting(id)
      setBetSettings(res.data.list)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const fetchParentBetSetting = async (id: number) => {
    try {
      const res = await API.fetchBetSetting(id)
      setParentBetSettings(res.data.list)
    } catch (err) {
      apiErrHandler(err)
    }
  }

  const doEditBetSetting = async (req: BetSettingEditRequest) => {
    try {
      await API.editBetSetting(req)
      setEditVisible(false)
      toast({ status: 'success', title: '修改成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }

  const fetchById = async (id: number) => {
    try {
      const res = await API.fetchById(id)
      setViewData(res.data)
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
  const setTest = async (id: number, is_active: boolean) => {
    try {
      await API.setTest({ id, is_active })
      setSearch((s) => ({ ...s }))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const setRealName = async (id: number, is_active: boolean) => {
    try {
      await API.realName({ id, is_active })
      setSearch((s) => ({ ...s }))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const setPromo = async (id: number, is_active: boolean) => {
    try {
      await API.promo({ id, is_active })
      setSearch((s) => ({ ...s }))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const setWithdraw = async (id: number, is_active: boolean) => {
    try {
      await API.withdraw({ id, is_active })
      setSearch((s) => ({ ...s }))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const setOpenBet = async (id: number, is_active: boolean) => {
    try {
      await API.openBet({ id, is_active })
      setSearch((s) => ({ ...s }))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const setStatus = async (id: number, status: BlockStatus) => {
    try {
      await API.status({ id, status })
      setSearch((s) => ({ ...s }))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doCreate = async (req: MemberCreateRequest) => {
    try {
      await API.create(req)
      setSearch((s) => ({ ...s }))
      setCreateVisible(false)
      toast({ status: 'success', title: '新增成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doEdit = async (req: MemberEditRequest) => {
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

  const doEditCredit = async (id: number, credit: number) => {
    try {
      await API.credit(id, credit)
      setSearch((s) => ({ ...s }))
      setPassVisible(false)
      toast({ status: 'success', title: '額度調整成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const doEditPass = async (id: number, pass: string) => {
    try {
      await API.pass(id, pass)
      setPassVisible(false)
      toast({ status: 'success', title: '密碼修改成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }

  const doEditTradePass = async (id: number, pass: string) => {
    try {
      await API.tradePass(id, pass)
      setTradePassVisible(false)
      toast({ status: 'success', title: '密碼修改成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }

  const doEditTags = async (req: MemberTagEditRequest) => {
    try {
      await API.addTags(req)
      setSearch((s) => ({ ...s }))
      setTagVisible(false)
      toast({ status: 'success', title: '新增成功' })
    } catch (err) {
      apiErrHandler(err)
    }
  }

  return {
    fetchList,
    fetchById,
    setActive,
    setOpenBet,
    setTest,
    setStatus,
    setRealName,
    setPromo,
    setWithdraw,
    doCreate,
    doEdit,
    doDelete,
    doEditPass,
    doEditTradePass,
    fetchBetSetting,
    fetchParentBetSetting,
    doEditBetSetting,
    doEditCredit,
    doEditTags,
  }
}

export default useMemberService
