import { usePopupContext } from '@/context/PopupContext'
import useDefaultBetService from '@/utils/services/useDefaultBetService'
import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
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
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<DefaultBetFormProps>()
  useEffect(() => {
    visible && form.resetFields()
  }, [visible])
  return (
    <Modal
      title="新增盤口設定"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
      // width={700}
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