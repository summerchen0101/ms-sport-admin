import { Col, Form, FormInstance, Input, Row, Switch } from 'antd'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'

const ContentEditor = dynamic(() => import('@/components/ContentEditor'), {
  ssr: false,
})

export interface PageContentFormProps {
  id?: number
  title: string
  code: string
  content: string
  content_mobile: string
  is_active: boolean
}

function FormData({
  data,
  form,
}: {
  data: PageContentFormProps
  form: FormInstance<PageContentFormProps>
}) {
  const mediaTyps = [
    { label: '网页版内容', name: 'content' },
    { label: '手机版内容', name: 'content_mobile' },
  ]
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="标题" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="代码" name="code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="状态" name="is_active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
      </Row>
      {mediaTyps.map((t, i) => (
        <Form.Item
          key={i}
          label={t.label}
          name={t.name}
          rules={[{ required: true }]}
        >
          <ContentEditor />
        </Form.Item>
      ))}
    </Form>
  )
}

export default FormData
