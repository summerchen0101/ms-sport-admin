import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Stack,
} from '@chakra-ui/react'
import {
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Radio,
  Row,
  Switch,
} from 'antd'
import { Moment } from 'moment'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
// import ContentEditor from '../ContentEditor'
import ImageUpload from '../ImageUpload'
import InlineFormField from '../InlineFormField'

const ContentEditor = dynamic(() => import('@/components/ContentEditor'), {
  ssr: false,
})

export interface ActivityFormProps {
  id?: number
  title: string
  content: string
  date_range_type: string
  limit_range: [Moment, Moment]
  is_active: boolean
  content_mobile: string
  img: string
  img_mobile: string
  bonus: number
}

function FormData({
  data,
  form,
}: {
  data: ActivityFormProps
  form: FormInstance<ActivityFormProps>
}) {
  // const disabledDate = (current) => {
  //   return current && current < moment().startOf('day')
  // }

  const mediaTyps = [
    { label: '网页版内容', content: 'content', img: 'img' },
    { label: '手机版内容', content: 'content_mobile', img: 'img_mobile' },
  ]
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form form={form} initialValues={data} layout="vertical">
      <Form.Item
        label="活动名称"
        name="title"
        rules={[{ required: true, max: 60 }]}
      >
        <Input placeholder="请输入内容" />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="红利" name="bonus" rules={[{ required: true }]}>
            <Box as={InputNumber} min={1} w="100%" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="状态" name="is_active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="期间" name="date_range_type">
        <Stack as={Radio.Group} direction={['column', 'row']} spacing="12px">
          <Radio value="forever">无限期</Radio>
          <Radio value="limit">
            <InlineFormField name="limit_range" w={['auto', 'auto']}>
              <DatePicker.RangePicker />
            </InlineFormField>
          </Radio>
        </Stack>
      </Form.Item>

      <Accordion defaultIndex={[0]} allowMultiple colorScheme="brand">
        {mediaTyps.map((t, i) => (
          <AccordionItem key={i}>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontSize="14px">
                {t.label}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel py={4}>
              <Form.Item
                name={t.img}
                rules={[{ required: true, message: '请选择图片' }]}
              >
                <ImageUpload />
              </Form.Item>
              <Form.Item
                label="内容"
                name={t.content}
                rules={[{ required: true, message: '请输入活动内容' }]}
              >
                <ContentEditor />
              </Form.Item>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Form>
  )
}

export default FormData
