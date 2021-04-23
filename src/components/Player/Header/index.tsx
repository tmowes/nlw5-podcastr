import { Image, Heading, HStack } from '@chakra-ui/react'

export const Header = () => (
  <HStack gap="4">
    <Image src="/assets/playing.svg" alt="Tocando agora" />
    <Heading fontSize="14px">Tocando agora</Heading>
  </HStack>
)
