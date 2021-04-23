import { Flex, Heading } from '@chakra-ui/react'

export const EmptyCard = () => (
  <Flex
    align="center"
    justify="center"
    h="20rem"
    bg="grayAlpha.100"
    borderColor="grayAlpha.500"
    borderStyle="dashed"
    borderWidth="2px"
    borderRadius="16"
    bgGradient="linear(to-br, grayAlpha.300, transparent)"
  >
    <Heading fontSize="14px" textAlign="center" color="gray.400" px="12">
      Selecione um podcast para ouvir
    </Heading>
  </Flex>
)
