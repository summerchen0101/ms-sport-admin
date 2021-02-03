import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { League } from '@/types/api/League'
import useLeagueService from '@/utils/services/useLeagueService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'

function TableData({ list }: { list: League[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useLeagueService()
  const { toOptionName, toDate } = useTransfer()
  const columns: ColumnsType<League> = useMemo(
    () => [
      {
        title: '名稱',
        render: (_, row) => row.name,
      },
      {
        title: '365代碼',
        width: 180,
        render: (_, row) => row.bet365_code,
      },
      {
        title: '球種',
        width: 120,
        render: (_, row) => row.game.name,
      },
      {
        title: '創建時間',
        render: (_, row) => toDateTime(row.created_at),
      },
      {
        title: '更新時間',
        render: (_, row) => toDateTime(row.updated_at),
      },
      {
        title: '啟用',
        render: (_, row) => (
          <Switch
            colorScheme="brand"
            isChecked={row.is_active}
            onChange={(e) =>
              setActive(row.id, e.target.checked, { game_id: row.game.id })
            }
          />
        ),
      },
      {
        title: '操作',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="編輯"
              icon={<HiOutlinePencilAlt />}
              onClick={() => fetchById(row.id)}
            />
            <TipIconButton
              label="刪除"
              icon={<HiOutlineTrash />}
              colorScheme="red"
              onClick={() => doDelete(row.id, { game_id: row.game.id })}
            />
          </HStack>
        ),
      },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
