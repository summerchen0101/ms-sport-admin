import { RechargeType, WalletRecType, WalletType } from '@/lib/enums'
import { rechargeTypeOpts, walletRecTypeOpts } from '@/lib/options'
import { SimpleGrid } from '@chakra-ui/layout'
import { Form, FormInstance, Input, InputNumber, Radio, Select } from 'antd'
import React, { useEffect, useState } from 'react'

export interface RechargeRecFormProps {
  id?: number
  acc: string
  amount: number
  note: string
  recharge_type: RechargeType
  wallet_rec_type: WalletRecType
}

function FormData({
  data,
  form,
}: {
  data: RechargeRecFormProps
  form: FormInstance<RechargeRecFormProps>
}) {
  const [currentType, setCurrentType] = useState<RechargeType>(RechargeType.Add)
  const handleTypeChanged = (e) => {
    form.setFieldsValue({ wallet_rec_type: WalletRecType.Manual })
    setCurrentType(+e.target.value)
  }
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <SimpleGrid spacing="15px" columns={2}>
        <Form.Item
          label="加扣类型"
          name="recharge_type"
          rules={[{ required: true }]}
        >
          <Radio.Group
            options={rechargeTypeOpts}
            onChange={handleTypeChanged}
          />
        </Form.Item>
        <Form.Item
          label="纪录属性"
          name="wallet_rec_type"
          rules={[{ required: true }]}
        >
          <Select
            options={[
              ...walletRecTypeOpts.filter((t) =>
                [
                  WalletRecType.Manual,
                  WalletRecType.Deposit,
                  WalletRecType.Activity,
                ].includes(t.value),
              ),
            ]}
            disabled={currentType !== RechargeType.Add}
          />
        </Form.Item>
        <Form.Item label="点数" name="amount" rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} step={100} min={1} />
        </Form.Item>
        <Form.Item label="会员帐号" name="acc" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </SimpleGrid>
      <Form.Item label="备注" name="note">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default FormData
