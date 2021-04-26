import { MemberType } from '@/lib/enums'
import { ParentTreeItem } from '@/types/api/Member'
import { Box, Stack, StackProps, Text } from '@chakra-ui/layout'
import React, { Fragment } from 'react'

interface ParentTreeProps {
  tree: ParentTreeItem[]
}

export default function ParentTree({
  tree,
  ...props
}: ParentTreeProps & StackProps) {
  return (
    <Box mb="2" fontWeight="500" color="gray.700" {...props}>
      {tree?.map((t, i) => (
        <Box key={i} display="inline-block" mb="1">
          {t.acc}[{t.name}]
          <Text as="span" color="brown.500">
            ({t.member_type === MemberType.Agent ? '代' : '会'})
          </Text>
          {i !== tree.length - 1 && (
            <Text as="span" mx="2" color="gray.500">
              {'>'}
            </Text>
          )}
        </Box>
      ))}
    </Box>
  )
}
