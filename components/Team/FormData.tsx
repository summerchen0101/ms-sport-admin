import { useOptionsContext } from '@/context/OptionsContext'
import useOptionsService from '@/utils/services/useOptionsService'
import { Form, FormInstance, Input, Select, Switch } from 'antd'
import React, { useEffect } from 'react'

export interface TeamFormProps {
  id?: number
  name: string
  name_en: string
  note: string
  game_code: string
  league_id: number
  is_active: boolean
}

function FormData({
  data,
  form,
}: {
  data: TeamFormProps
  form: FormInstance<TeamFormProps>
}) {
  const [gameOpts] = useOptionsContext().game
  const [leagueOpts, setLeagueOpts] = useOptionsContext().league
  const { fetchLeagueOptions } = useOptionsService()
  // useEffect(() => {
  //   form.setFieldsValue(data)
  // }, [data])
  const handleGameChanged = (game_code: string) => {
    fetchLeagueOptions(game_code)
  }
  useEffect(() => {
    form.resetFields()
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="球种" name="game_code" rules={[{ required: true }]}>
        <Select
          options={gameOpts}
          placeholder="请选择"
          onChange={handleGameChanged}
          disabled={!!data.id}
        />
      </Form.Item>
      <Form.Item label="联盟" name="league_id" rules={[{ required: true }]}>
        <Select
          options={leagueOpts}
          placeholder="请选择"
          disabled={!!data.id}
          showSearch
          optionFilterProp="label"
        />
      </Form.Item>
      <Form.Item
        label="名称"
        name="name"
        rules={[{ required: true }, { max: 30 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="英文名称"
        name="name_en"
        rules={[{ required: true }, { max: 30 }]}
      >
        <Input disabled={!!data.id} />
      </Form.Item>
      <Form.Item label="备注" name="note" rules={[{ max: 30 }]}>
        <Input />
      </Form.Item>
      <Form.Item label="状态" name="is_active" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  )
}

export default FormData
