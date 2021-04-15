import { useOptionsContext } from '@/context/OptionsContext'
import { AccountingType, MemberType, RestoreType } from '@/lib/enums'
import {
  accountingTypeOpts,
  memberTypeOpts,
  restoreTypeOpts,
} from '@/lib/options'
import { BetSetting, Member } from '@/types/api/Member'
import useOptionsService from '@/utils/services/useOptionsService'
import { SimpleGrid } from '@chakra-ui/react'
import { Form, FormInstance, Input, Select, Switch } from 'antd'
import React, { useEffect } from 'react'

export interface EditMemberFormProps {
  id?: number
  name: string
  acc: string
  member_type: MemberType
  accounting_type: AccountingType
  restore_type: RestoreType
  note: string
  promo_level: number
  is_lock_promo_level: boolean
}

function EditFormData({
  data,
  form,
}: {
  data: EditMemberFormProps
  form: FormInstance<EditMemberFormProps>
}) {
  const [affiliateLevelOpts] = useOptionsContext().affiliateLevel
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <SimpleGrid spacingX="20px" columns={[1, 2]}>
        <Form.Item label="会员种类" name="member_type">
          <Select options={memberTypeOpts} disabled />
        </Form.Item>
        <Form.Item label="帐务类型" name="accounting_type">
          <Select options={accountingTypeOpts} disabled />
        </Form.Item>
        <Form.Item label="帐号" name="acc">
          <Input disabled />
        </Form.Item>
        <Form.Item label="暱称" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="回复设置"
          name="restore_type"
          rules={[{ required: true }]}
        >
          <Select options={restoreTypeOpts} />
        </Form.Item>

        <Form.Item label="会员备注" name="note">
          <Input />
        </Form.Item>
        {data.member_type === MemberType.Member && (
          <>
            <Form.Item
              label="佣金等级"
              name="promo_level"
              rules={[{ required: true }]}
            >
              <Select options={affiliateLevelOpts} placeholder="请选择" />
            </Form.Item>
            <Form.Item
              label="佣金等级锁定"
              name="is_lock_promo_level"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </>
        )}
      </SimpleGrid>
    </Form>
  )
}

export default EditFormData
