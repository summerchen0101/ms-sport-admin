import {
  Box,
  Collapse,
  Icon,
  Text,
  TextProps,
  useDisclosure,
} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import * as icons from 'react-icons/hi'

export interface MenuItemProps {
  name: string
  path?: string
  icon?: string
  pages?: Record<string, { name: string; path?: string }>
}

const textStyles: TextProps = {
  fontWeight: '500',
  letterSpacing: '2px',
  color: 'gray.200',
  textShadow: '1px 0px rgba(0,0,0,0.2)',
}

const MenuItem: React.FC<MenuItemProps> = ({ name, path, icon, pages }) => {
  const { isOpen, onToggle } = useDisclosure()
  const category = (
    <Text onClick={pages && onToggle} {...textStyles}>
      <Icon
        as={icons[icon] || icons.HiOutlineStar}
        verticalAlign="text-bottom"
        mr="2"
      />
      {name}
    </Text>
  )
  const childText = (name: string) => (
    <Text {...textStyles} ml="6">
      {name}
    </Text>
  )
  return (
    <Box w="100%" color="white">
      <Box w="100%" py="3" px="5" cursor="pointer" shadow="sm">
        {!pages ? <Link href={path}>{category}</Link> : category}
      </Box>
      {pages && (
        <Collapse in={isOpen} animateOpacity>
          <Box bg="blue.600">
            {Object.entries(pages).map(([key, item], i) => (
              <Link key={i} href="/">
                <Box py="3" px="5" shadow="sm" cursor="pointer">
                  {item.path ? (
                    <Link href={item.path}>{childText(item.name)}</Link>
                  ) : (
                    childText(item.name)
                  )}
                </Box>
              </Link>
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  )
}

export default MenuItem
