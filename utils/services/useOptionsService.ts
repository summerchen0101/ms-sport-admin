import { useOptionsContext } from '@/context/OptionsContext'
import { OptionBasic } from '@/types'
import { useCallback } from 'react'
import useOptionsAPI from '../apis/useOptionsAPI'
import useErrorHandler from '../useErrorHandler'

const toOptionTypes = (opts: OptionBasic[]) =>
  opts.map((t) => ({ ...t, label: t.name, value: t.id }))

function useOptionsService() {
  const { apiErrHandler } = useErrorHandler()
  const [, setRoles] = useOptionsContext().role
  const [, setPermissions] = useOptionsContext().permission
  const [, setMenus] = useOptionsContext().menu
  const [, setCountries] = useOptionsContext().country
  const [, setSports] = useOptionsContext().sport
  const [, setGames] = useOptionsContext().game
  const [, setleagueGroups] = useOptionsContext().leagueGroup
  const [, setLeagues] = useOptionsContext().league
  const [, setTeams] = useOptionsContext().team
  const [, setFaqCategory] = useOptionsContext().faqCategory
  const [, setTags] = useOptionsContext().tag
  const [, setAffiliateLevels] = useOptionsContext().affiliateLevel
  const [, setThirdPartys] = useOptionsContext().thirdParty
  const [, setCashflowGroups] = useOptionsContext().cashflowGroup
  const [, setCashflowMerchants] = useOptionsContext().cashflowMerchant
  const API = useOptionsAPI()

  const fetchPermissionOptions = async () => {
    try {
      const res = await API.permissions()
      setPermissions(toOptionTypes(res.data.list))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const fetchMenuOptions = async () => {
    try {
      const res = await API.menus()
      setMenus(toOptionTypes(res.data.list))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const fetchRoleOptions = async () => {
    try {
      const res = await API.roles()
      setRoles(toOptionTypes(res.data.list))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const fetchCountryOptions = async () => {
    try {
      const res = await API.countries()
      setCountries(res.data.list.map((t) => ({ label: t.name, value: t.code })))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const fetchSportOptions = async () => {
    try {
      const res = await API.sports()
      setSports(res.data.list.map((t) => ({ label: t.name, value: t.code })))
    } catch (err) {
      apiErrHandler(err)
    }
  }
  const fetchGameOptions = useCallback(async () => {
    try {
      const res = await API.games()
      setGames(res.data.list.map((t) => ({ label: t.name, value: t.code })))
    } catch (err) {
      apiErrHandler(err)
    }
  }, [])

  const fetchLeagueOptions = useCallback(async (game_code: string) => {
    try {
      const res = await API.leagues(game_code)
      setLeagues(
        toOptionTypes(
          res.data.list.sort((a, b) => {
            if (a.name < b.name) {
              return -1
            }
            if (a.name > b.name) {
              return 1
            }
            return 0
          }),
        ),
      )
    } catch (err) {
      apiErrHandler(err)
    }
  }, [])
  const fetchLeagueGroupOptions = useCallback(async (game_code: string) => {
    try {
      const res = await API.leagueGroups(game_code)
      setleagueGroups(
        res.data.list.map((t) => ({ label: t.name, value: t.code })),
      )
    } catch (err) {
      apiErrHandler(err)
    }
  }, [])

  const fetchTeamOptions = useCallback(async (league_id: number) => {
    try {
      const res = await API.teams(league_id)
      setTeams(toOptionTypes(res.data.list))
    } catch (err) {
      apiErrHandler(err)
    }
  }, [])
  const fetchFaqCategoryOptions = useCallback(async () => {
    try {
      const res = await API.faqCategorys()
      setFaqCategory(toOptionTypes(res.data.list))
    } catch (err) {
      apiErrHandler(err)
    }
  }, [])
  const fetchTagOptions = useCallback(async () => {
    try {
      const res = await API.tags()
      setTags(res.data.list)
    } catch (err) {
      apiErrHandler(err)
    }
  }, [])
  const fetchAffiliateLevelOptions = useCallback(async () => {
    try {
      const res = await API.affiliateLevels()
      setAffiliateLevels(
        res.data.list.map((t) => ({ label: t.name, value: t.level })),
      )
    } catch (err) {
      apiErrHandler(err)
    }
  }, [])

  const fetchThirdPartyOptions = useCallback(async () => {
    try {
      const res = await API.thirdPartys()
      setThirdPartys(
        res.data.list.map((t) => ({ label: t.name, value: t.code })),
      )
    } catch (err) {
      apiErrHandler(err)
    }
  }, [])

  const fetchCashflowGroups = useCallback(async () => {
    try {
      const res = await API.cashflowGroups()
      setCashflowGroups(
        res.data.list.map((t) => ({ label: t.name, value: t.code })),
      )
    } catch (err) {
      apiErrHandler(err)
    }
  }, [])

  const fetchCashflowMerchants = useCallback(async () => {
    try {
      const res = await API.cashflowMerchants()
      setCashflowMerchants(toOptionTypes(res.data.list))
    } catch (err) {
      apiErrHandler(err)
    }
  }, [])

  return {
    fetchPermissionOptions,
    fetchRoleOptions,
    fetchCountryOptions,
    fetchSportOptions,
    fetchGameOptions,
    fetchLeagueGroupOptions,
    fetchLeagueOptions,
    fetchTeamOptions,
    fetchFaqCategoryOptions,
    fetchMenuOptions,
    fetchTagOptions,
    fetchAffiliateLevelOptions,
    fetchThirdPartyOptions,
    fetchCashflowGroups,
    fetchCashflowMerchants,
  }
}

export default useOptionsService
