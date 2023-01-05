import { Flex, Input, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {}

const AddForm = (props: Props) => {
  return (
    <Flex w='50%' h='40vh' bgColor=''>
        <Text>Task Title</Text>
        <Input variant='filled'/>
    </Flex>
  )
}

export default AddForm