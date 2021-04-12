import { SimpleGrid, Stack } from '@chakra-ui/react'
import { Form, Input, InputNumber, Radio } from 'antd'
import React from 'react'
import InlineFormField from '../InlineFormField'

function BetSumForm() {
  return (
    <>
      <SimpleGrid columns={[1, 2]} spacingX="20px">
        <Form.Item label="累计洗码量" name="login_times">
          <InputNumber style={{ width: '100%' }} min={0} step={1000} />
        </Form.Item>
      </SimpleGrid>

      <Form.Item label="礼金计算">
        <Stack
          as={Radio.Group}
          direction={['column', 'row']}
          spacing="12px"
          defaultValue={1}
        >
          <Radio value={1}>
            <InlineFormField label="固定">
              <Input addonAfter="点" />
            </InlineFormField>
          </Radio>
          <Radio value={2}>
            <InlineFormField label="按比例">
              <Input addonBefore="洗码量 x" addonAfter="％" />
            </InlineFormField>
          </Radio>
        </Stack>
      </Form.Item>
      <SimpleGrid columns={[1, 2]} spacingX="20px">
        <Form.Item label="礼金上限" name="limit">
          <Input placeholder="无限制" />
        </Form.Item>
        <Form.Item label="出金流水倍数" name="times">
          <Input addonBefore="礼金 x" addonAfter="倍" placeholder="1" />
        </Form.Item>
      </SimpleGrid>
    </>
  )
}

export default BetSumForm
