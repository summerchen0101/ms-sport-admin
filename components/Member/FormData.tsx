import { useDataContext } from '@/context/DataContext'
import { AccountingType, MemberType, RestoreType } from '@/lib/enums'
import {
  accountingTypeOpts,
  memberTypeOpts,
  restoreTypeOpts,
} from '@/lib/options'
import { BetSetting, Member } from '@/types/api/Member'
import { SimpleGrid, Spacer } from '@chakra-ui/react'
import { Form, FormInstance, Input, Select, Switch } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import BatchBetSettings from './BatchBetSettings'
import BetSettingsTabGroup from './BetSettingsTabGroup'

export type BetSettingFormProps = Record<
  string,
  Record<string, Record<string, BetSetting>>
>

export interface MemberFormProps {
  id?: number
  name: string
  acc: string
  pass: string
  member_type: MemberType
  accounting_type: AccountingType
  restore_type: RestoreType
  note: string
  // parent_id: number
  is_active: boolean
  is_open_bet: boolean
  balance: number
  bet_settings: BetSettingFormProps
  lock_member_type?: boolean
  lock_accounting_type?: boolean
  parent?: Member
  is_test?: boolean
}
export const paramsOpts = {
  [MemberType.Member]: [
    { label: '单注上限', value: 'single_bet_limit' },
    { label: '单注下限', value: 'single_bet_least' },
    { label: '单边上限', value: 'single_side_limit' },
    { label: '单场上限', value: 'single_game_limit' },
    {
      label: '退水％',
      value: 'rebate_percent',
      help: '玩家下注洗碼返水, 比如玩家下注1000元, 欄位設定值0.5%, 則返水5元',
    },
    { label: '下注状态', value: 'is_open_bet' },
  ],
  [MemberType.Agent]: [
    { label: '单注上限', value: 'single_bet_limit' },
    { label: '单注下限', value: 'single_bet_least' },
    { label: '单边上限', value: 'single_side_limit' },
    { label: '单场上限', value: 'single_game_limit' },
    { label: '占成', value: 'risk_percent' },
    {
      label: '退水％',
      value: 'rebate_percent',
      help: '玩家下注洗碼返水, 比如玩家下注1000元, 欄位設定值0.5%, 則返水5元',
    },
    {
      label: '佣金％',
      value: 'fee_percent',
      help: '系統抽取玩家佣金5%, 欄位設定2%, 則分給此代理2%',
    },
    { label: '下注状态', value: 'is_open_bet' },
  ],
}

function FormData({
  data,
  form,
}: {
  data: MemberFormProps
  form: FormInstance<MemberFormProps>
}) {
  const { setBetSettingMemberType } = useDataContext()

  useEffect(() => {
    form.setFieldsValue(data)
    setBetSettingMemberType(data.member_type)
  }, [])

  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <SimpleGrid spacingX="20px" columns={[1, 2, 3]}>
        {data.parent?.name && (
          <Form.Item label="上层" name={['parent', 'name']}>
            <Input disabled />
          </Form.Item>
        )}
        <Form.Item
          label="会员种类"
          name="member_type"
          rules={[{ required: true }]}
        >
          <Select
            options={memberTypeOpts}
            disabled={!!data.id || data.lock_member_type}
            onChange={(value: MemberType) => setBetSettingMemberType(value)}
          />
        </Form.Item>
        <Form.Item
          label="帐务类型"
          name="accounting_type"
          rules={[{ required: true }]}
        >
          <Select
            options={accountingTypeOpts}
            disabled={!!data.id || data.lock_accounting_type}
          />
        </Form.Item>
        <Form.Item label="帐号" name="acc" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="暱称" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        {!data.id && (
          <Form.Item label="密码" name="pass" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item label="会员备注" name="note">
          <Input />
        </Form.Item>
        <Form.Item
          label="回复设置"
          name="restore_type"
          rules={[{ required: true }]}
        >
          <Select options={restoreTypeOpts} />
        </Form.Item>
        <Form.Item label="测试帐号" name="is_test" valuePropName="checked">
          <Switch disabled={data.parent?.is_test} />
        </Form.Item>
        <Form.Item label="启用状态" name="is_active" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="下注状态" valuePropName="checked" name="is_open_bet">
          <Switch />
        </Form.Item>
      </SimpleGrid>

      {/* 批次设置 */}
      <BatchBetSettings
        onChange={(settings) => {
          form.setFieldsValue({ bet_settings: settings })
        }}
      />
      <BetSettingsTabGroup />
    </Form>
  )
}

export default FormData
