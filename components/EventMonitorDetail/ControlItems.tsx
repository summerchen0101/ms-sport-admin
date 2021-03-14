import { Button } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { HStack, Spacer, Text, Stack } from '@chakra-ui/layout'
import { Switch } from '@chakra-ui/switch'
import { InputNumber, Popover } from 'antd'
import React, { useEffect } from 'react'
import { HiInformationCircle } from 'react-icons/hi'

function ControlItems({ isHandicap }: { isHandicap?: boolean }) {
  return (
    <>
      <InputNumber
        step={0.01}
        size="small"
        placeholder="賠率"
        defaultValue={0.98}
        className="blue"
      />
      {/* <InputNumber step={1} size="small" placeholder="盤口" />
      <InputNumber step={25} size="small" placeholder="％" /> */}
      {isHandicap ? (
        <>
          <InputNumber
            step={1}
            size="small"
            placeholder="盤口"
            min={0}
            className="orange"
            defaultValue={2}
          />
          <InputNumber
            step={25}
            size="small"
            placeholder="％"
            className="green"
            defaultValue={-100}
            min={-100}
            max={100}
          />
        </>
      ) : (
        <Spacer />
      )}

      {/* <Switch colorScheme="teal" defaultChecked size="sm" />
      <Switch colorScheme="brown" defaultChecked size="sm" /> */}
      <HStack spacing="3px">
        <span>自結</span>
        <Switch colorScheme="blue" defaultChecked size="sm" />
      </HStack>

      <Popover
        content={
          <Stack spacing="sm">
            <Text>實貨量：10,000</Text>
            <Text>投注數：100</Text>
          </Stack>
        }
      >
        <Text as="a" color="brown.700" fontWeight="600">
          1.0
        </Text>
      </Popover>
    </>
  )
}

export default ControlItems
