import { usePopupContext } from '@/context/PopupContext'
import usePageContentService from '@/utils/services/usePageContentService'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import PopupForm from '../PopupForm'
import FormData, { PageContentFormProps } from './FormData'
import { Form, Modal } from 'antd'
import { Box } from '@chakra-ui/react'
import { useDataContext } from '@/context/DataContext'
import { PageContent } from '@/types/api/PageContent'
import moment from 'moment'

function EditPopup() {
  const { doEdit } = usePageContentService()
  const [visible, setVisible] = usePopupContext('editForm')
  const { viewData } = useDataContext<PageContent>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEdit({
        id: viewData.id,
        content: d.content,
        url: d.url,
        is_blank: d.is_blank,
        start_at: d.date_range_type === 'limit' ? d.limit_range[0].unix() : 0,
        end_at: d.date_range_type === 'limit' ? d.limit_range[1].unix() : 0,
        is_active: d.is_active,
      })
      form.resetFields()
      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const [form] = Form.useForm<PageContentFormProps>()
  if (!viewData) return <></>
  return (
    <Modal
      title="編輯跑馬燈"
      visible={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <FormData
        form={form}
        data={{
          id: viewData.id,
          content: viewData.content,
          url: viewData.url,
          date_range_type: viewData.start_at ? 'limit' : 'forever',
          limit_range: [
            viewData.start_at && moment(viewData.start_at * 1000),
            viewData.end_at && moment(viewData.end_at * 1000),
          ],
          is_active: viewData.is_active,
          is_blank: viewData.is_blank,
        }}
      />
    </Modal>
  )
}

export default EditPopup
