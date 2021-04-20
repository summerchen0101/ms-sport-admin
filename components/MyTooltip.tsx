import Icon, { IconProps } from '@chakra-ui/icon'
import { Tooltip } from 'antd'
import React from 'react'
import { HiInformationCircle } from 'react-icons/hi'

type MyTooltipProps = {
  tip: string
} & IconProps

export default function MyTooltip({ tip, ...props }: MyTooltipProps) {
  return (
    <Tooltip title={tip}>
      <Icon
        cursor="default"
        color="brown.300"
        fontSize="md"
        as={HiInformationCircle}
        {...props}
      />
    </Tooltip>
  )
}
