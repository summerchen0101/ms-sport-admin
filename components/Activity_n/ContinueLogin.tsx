import { SimpleGrid, Stack } from '@chakra-ui/react'
import { Form, Input, InputNumber, Radio } from 'antd'
import React from 'react'
import InlineFormField from '../InlineFormField'

function ContinueLogin() {
  return (
    <>
      <SimpleGrid columns={[1, 2]} spacingX="20px">
        <Form.Item label="连续登录" name="login_times">
          <Input addonAfter="天" />
        </Form.Item>
      </SimpleGrid>

      <SimpleGrid columns={[1, 2]} spacingX="20px">
        <Form.Item label="礼金">
          <Input addonAfter="点" />
        </Form.Item>
        <Form.Item label="出金流水倍数" name="times">
          <Input addonBefore="礼金 x" addonAfter="倍" placeholder="1" />
        </Form.Item>
      </SimpleGrid>
    </>
  )
}

export default ContinueLogin
