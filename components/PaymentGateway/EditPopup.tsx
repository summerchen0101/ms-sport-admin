import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { PaymentGateway } from '@/types/api/PaymentGateway'
import usePaymentGatewayService from '@/utils/services/usePaymentGatewayService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { PaymentGatewayFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = usePaymentGatewayService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<PaymentGateway>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
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
  if (!viewData) return <></>
  return (
    <Modal
      title="编辑金流支付方式"
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
          id: viewData.id,
          merchant_id: viewData.merchant.id,
          payment_type: viewData.payment_type,
          single_deposit_least: viewData.single_deposit_least,
          single_deposit_limit: viewData.single_deposit_limit,
          deposit_fee: viewData.deposit_fee,
          deposit_fee_percent: viewData.deposit_fee_percent,
          deposit_limit_day: viewData.deposit_limit_day,
          deposit_limit_week: viewData.deposit_limit_week,
          deposit_limit_mon: viewData.deposit_limit_mon,
          is_active: viewData.is_active,
        }}
      />
    </Modal>
  )
}

export default EditPopup
