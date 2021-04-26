import { usePopupContext } from '@/context/PopupContext'
import { RechargeType, WalletRecType } from '@/lib/enums'
import useRechargeRecService from '@/utils/services/useRechargeRecService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import FormData, { RechargeRecFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useRechargeRecService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate(d)

      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<RechargeRecFormProps>()
  return (
    <Modal
      title="人工加扣点"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
    >
      <FormData
        form={form}
        data={{
          acc: '',
          amount: null,
          note: '',
          recharge_type: RechargeType.Add,
          wallet_rec_type: WalletRecType.Manual,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
