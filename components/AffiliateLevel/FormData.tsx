import { Box, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import { Form, FormInstance, Input, InputNumber, Switch } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import CurrencyInputNumber from '../CurrencyInputNumber'
export interface AffiliateLevelFormProps {
  id?: number
  level: number
  name: string
  active_member_count: number
  active_agent_count: number
  result_min: number
  result_percent: number
  fee_min: number
  fee_percent: number
  is_active: boolean
}

function FormData({
  data,
  form,
}: {
  data: AffiliateLevelFormProps
  form: FormInstance<AffiliateLevelFormProps>
}) {
  const disabledDate = (current) => {
    return current && current < moment().startOf('day')
  }
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <SimpleGrid columns={[2]} spacingX="20px">
        <Form.Item label="阶级名称" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="阶级排序" name="level" rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="活跃玩家数"
          name="active_member_count"
          rules={[{ required: true }]}
        >
          <Input addonAfter="个" />
        </Form.Item>
        <Form.Item
          label="有效代理数"
          name="active_agent_count"
          rules={[{ required: true }]}
        >
          <Input addonAfter="个" />
        </Form.Item>
      </SimpleGrid>

      <SimpleGrid columns={2} spacingX="20px">
        <Form.Item
          label="会员输赢"
          name="result_min"
          rules={[{ required: true }]}
        >
          <CurrencyInputNumber style={{ width: '100%' }} step={100} min={0} />
        </Form.Item>
        <Form.Item
          label="会员输赢佣金"
          name="result_percent"
          rules={[{ required: true }]}
        >
          <Input addonAfter="％" />
        </Form.Item>
        <Form.Item
          label="累计手续费"
          name="fee_min"
          rules={[{ required: true }]}
        >
          <CurrencyInputNumber style={{ width: '100%' }} step={100} min={0} />
        </Form.Item>
        <Form.Item
          label="手续费佣金"
          name="fee_percent"
          rules={[{ required: true }]}
        >
          <Input addonAfter="％" />
        </Form.Item>
        <Form.Item label="状态" name="is_active" valuePropName="checked">
          <Switch />
        </Form.Item>
      </SimpleGrid>
    </Form>
  )
}

export default FormData
