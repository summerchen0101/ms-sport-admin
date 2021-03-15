import { useDataContext } from '@/context/DataContext'
import { usePopupContext } from '@/context/PopupContext'
import { Member } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import useValidator from '@/utils/useValidator'
import { Form, Input, Modal } from 'antd'
import React, { useEffect } from 'react'

function PasswordPopup() {
  const VD = useValidator()
  const { doEditPass } = useMemberService()
  const [visible, setVisible] = usePopupContext('passForm')
  const { viewId } = useDataContext<Member>()
  const [form] = Form.useForm<{ pass: string; pass_c: string }>()
  const handleSubmit = async () => {
    try {
      const d = await form.validateFields()
      await doEditPass(viewId, d.pass)

      setVisible(false)
    } catch (err) {}
  }
  const handleCancel = () => {
    setVisible(false)
  }
  useEffect(() => {
    visible && form.resetFields()
  }, [visible])
  return (
    <Modal
      title="密码修改"
      visible={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      width={400}
      destroyOnClose
    >
      <Form form={form} layout="vertical" validateTrigger="onBlur">
        <Form.Item
          label="密码"
          name="pass"
          rules={[{ required: true }, VD.userPassword]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="pass_c"
          rules={[{ required: true }, VD.sameAs('pass')]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default PasswordPopup
