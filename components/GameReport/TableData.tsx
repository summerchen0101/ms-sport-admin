import BasicTable from '@/components/BasicTable'
import { GameReport } from '@/types/api/GameReport'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'

function TableData({ list }: { list: GameReport[] }) {
  const columns: ColumnsType<GameReport> = useMemo(
    () => [
      {
        title: '帳號/暱稱',
        render: (_, row) => <a>abc[ABC]</a>,
      },
      {
        title: '筆數',
        render: (_, row) => 0,
      },
      {
        title: '注額',
        render: (_, row) => 0,
      },
      {
        title: '有效注額',
        render: (_, row) => 0,
      },
      {
        title: '輸贏金額',
        render: (_, row) => 0,
      },
      {
        title: '會員退水',
        render: (_, row) => 0,
      },
      {
        title: '小計',
        render: (_, row) => 0,
      },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
