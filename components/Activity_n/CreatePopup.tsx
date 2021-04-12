import { usePopupContext } from '@/context/PopupContext'
import useActivityService from '@/utils/services/useActivityService'
import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormData, { ActivityFormProps } from './FormData'

function CreatePopup() {
  const { doCreate } = useActivityService()
  const [visible, setVisible] = usePopupContext('createForm')
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doCreate({
        title: d.title,
        content: d.content,
        content_mobile: d.content_mobile,
        start_at: d.date_range_type === 'limit' ? d.limit_range[0].unix() : 0,
        end_at: d.date_range_type === 'limit' ? d.limit_range[1].unix() : 0,
        img: d.img,
        img_mobile: d.img_mobile,
        bonus: d.bonus,
        is_active: d.is_active,
      })
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<ActivityFormProps>()

  return (
    <Modal
      title="新增优惠"
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
          title: '',
          content: '',
          content_mobile: '',
          img: null,
          img_mobile: null,
          bonus: null,
          date_range_type: 'forever',
          limit_range: [null, null],
          is_active: true,
        }}
      />
    </Modal>
  )
}

export default CreatePopup
