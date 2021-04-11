import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { LeagueGroup } from '@/types/api/LeagueGroup'
import useLeagueGroupService from '@/utils/services/useLeagueGroupService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Switch } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ColumnsType } from 'antd/lib/table'
import { useOptionsContext } from '@/context/OptionsContext'

function TableData({ list }: { list: LeagueGroup[] }) {
  const { toDateTime, toOptionName } = useTransfer()
  const [gameOpts] = useOptionsContext().game
  const { setActive, fetchById, doDelete } = useLeagueGroupService()
  const columns: ColumnsType<LeagueGroup> = useMemo(
    () => [
      {
        title: '名称',
        render: (_, row) => row.name,
      },
      {
        title: '球种',
        render: (_, row) => toOptionName(gameOpts, row.game_code),
      },
      {
        title: '代码',
        render: (_, row) => row.code,
      },
      {
        title: '创建时间',
        render: (_, row) => toDateTime(row.created_at),
      },
      {
        title: '更新时间',
        render: (_, row) => toDateTime(row.updated_at),
      },
      {
        title: '启用',
        render: (_, row) => (
          <Switch
            colorScheme="teal"
            isChecked={row.is_active}
            onChange={(e) => setActive(row.id, e.target.checked)}
          />
        ),
      },
      {
        title: '操作',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="编辑"
              icon={<HiPencilAlt />}
              colorScheme="brown"
              onClick={() => fetchById(row.id)}
            />
            <TipIconButton
              label="删除"
              icon={<HiOutlineTrash />}
              colorScheme="red"
              onClick={() => doDelete(row.id)}
            />
          </HStack>
        ),
      },
    ],
    [gameOpts],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
