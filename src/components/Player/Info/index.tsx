import { Heading, Text, VStack } from '@chakra-ui/react'

import { InfoProps } from './types'

export const Info = (props: InfoProps) => {
  const { title, members } = props
  return (
    <VStack w="100%" alignSelf="stretch">
      <Heading fontSize="1.2rem" textAlign="center" color="gray.100">
        {title}
      </Heading>
      <Text fontSize="0.9rem" textAlign="center" color="gray.400">
        {members}
      </Text>
    </VStack>
  )
}
