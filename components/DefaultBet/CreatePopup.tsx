import { usePopupContext } from '@/context/PopupContext'
import useDefaultBetService from '@/utils/services/useDefaultBetService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { DefaultBetFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useDefaultBetService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        game_code: d.game_code,
      })
      form.resetFields()
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const [form] = Form.useForm<DefaultBetFormProps>()
  return (
    <Modal
      title="新增下注設定"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          game_code: '',
        }}
      />
    </Modal>
  )
}

export default CreatePopup
