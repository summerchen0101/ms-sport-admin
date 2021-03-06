import { usePopupContext } from '@/context/PopupContext'
import useSportGameService from '@/utils/services/useSportGameService'
import { Form, Modal } from 'antd'
import React from 'react'
import FormData, { SportGameFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useSportGameService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        code: d.code,
        name: d.name,
        is_active: d.is_active,
        country_code: d.country_code,
        sport_code: d.sport_code,
      })
      form.resetFields()
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const [form] = Form.useForm<SportGameFormProps>()
  return (
    <Modal
      title="新增球种"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          name: '',
          code: '',
          country_code: '',
          sport_code: '',
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
