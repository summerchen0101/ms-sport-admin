import { usePopupContext } from '@/context/PopupContext'
import usePaymentGatewayService from '@/utils/services/usePaymentGatewayService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { PaymentGatewayFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = usePaymentGatewayService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        merchant_id: d.merchant_id,
        payment_type: d.payment_type,
        single_deposit_least: +d.single_deposit_least,
        single_deposit_limit: +d.single_deposit_limit,
        deposit_fee: +d.deposit_fee,
        deposit_fee_percent: +d.deposit_fee_percent,
        deposit_limit_day: +d.deposit_limit_day,
        deposit_limit_week: +d.deposit_limit_week,
        deposit_limit_mon: +d.deposit_limit_mon,
        is_active: d.is_active,
      })
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<PaymentGatewayFormProps>()

  return (
    <Modal
      title="新增金流支付方式"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
      width={600}
    >
      <FormData
        form={form}
        data={{
          merchant_id: null,
          payment_type: null,
          single_deposit_least: null,
          single_deposit_limit: null,
          deposit_fee: null,
          deposit_fee_percent: null,
          deposit_limit_day: null,
          deposit_limit_week: null,
          deposit_limit_mon: null,
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
