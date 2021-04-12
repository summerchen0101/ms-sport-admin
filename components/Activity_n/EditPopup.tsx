import { useDataContext } from '@/context/DataContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { Activity } from '@/types/api/Activity'
import useActivityService from '@/utils/services/useActivityService'
import { Form, Modal } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import FormData, { ActivityFormProps } from './FormData'

function EditPopup() {
  const { doEdit } = useActivityService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<Activity>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
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
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm<ActivityFormProps>()

  if (!viewData) return <></>
  return (
    <Modal
      title="编辑活动"
      visible={visible}
      onOk={handleSubmit}
      centered
      onCancel={handleCancel}
      destroyOnClose
      width={700}
    >
      <FormData
        form={form}
        data={{
          id: viewData.id,
          title: viewData.title,
          content: viewData.content,
          date_range_type: viewData.start_at ? 'limit' : 'forever',
          limit_range: [
            viewData.start_at && moment(viewData.start_at * 1000),
            viewData.end_at && moment(viewData.end_at * 1000),
          ],
          is_active: viewData.is_active,
          content_mobile: viewData.content_mobile,
          img: viewData.img,
          img_mobile: viewData.img_mobile,
          bonus: viewData.bonus,
        }}
      />
    </Modal>
  )
}

export default EditPopup
