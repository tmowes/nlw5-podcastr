import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'

export const Player = () => (
  <Flex
    bg="gray.500"
    w="26rem"
    h="100vh"
    direction="column"
    align="center"
    justify="space-between"
    py="8"
    px="16"
  >
    <HStack gap="4">
      <Image src="/assets/playing.svg" alt="Tocando agora" />
      <Heading fontSize="14px">Tocando agora</Heading>
    </HStack>
    <Flex
      align="center"
      justify="center"
      p="12"
      h="20rem"
      bg="grayAlpha.100"
      borderColor="grayAlpha.500"
      borderStyle="dashed"
      borderWidth="2px"
      borderRadius="16"
      bgGradient="linear(to-br, grayAlpha.300, transparent)"
    >
      <Heading fontSize="14px" textAlign="center" color="gray.400">
        Selecione um podcast para ouvir
      </Heading>
    </Flex>
    <VStack w="100%" alignSelf="stretch">
      <HStack w="100%" mb="4">
        <Text color="gray.400">00:00</Text>
        <Box w="100%" bg="grayAlpha.500" h="1" borderRadius="10">
          <Box bg="orange.500" w="69%" h="1" borderRadius="10" />
        </Box>
        <Text color="gray.400">00:00</Text>
      </HStack>
      <HStack>
        <IconButton
          aria-label="Embaralhar"
          w="12"
          h="12"
          borderRadius="12"
          colorScheme="transparent"
          icon={
            <Image
              src="/assets/controls/shuffle.svg"
              w="5"
              h="5"
              alt="Embaralhar"
            />
          }
        />
        <IconButton
          aria-label="Tocar anterior"
          w="12"
          h="12"
          borderRadius="12"
          colorScheme="transparent"
          icon={
            <Image
              src="/assets/controls/play-previous.svg"
              w="5"
              h="5"
              alt="Tocar anterior"
            />
          }
        />
        <IconButton
          aria-label="Tocar"
          w="12"
          h="12"
          borderRadius="12"
          colorScheme="whiteAlpha"
          icon={<Image src="/assets/controls/play.svg" alt="Tocar" />}
        />
        <IconButton
          aria-label="Tocar proxima"
          w="12"
          h="12"
          borderRadius="12"
          colorScheme="transparent"
          icon={
            <Image
              src="/assets/controls/play-next.svg"
              w="5"
              h="5"
              alt="Tocar proxima"
            />
          }
        />
        <IconButton
          aria-label="Repetir"
          w="12"
          h="12"
          borderRadius="12"
          colorScheme="transparent"
          icon={
            <Image
              src="/assets/controls/repeat.svg"
              w="5"
              h="5"
              alt="Repetir"
            />
          }
        />
      </HStack>
    </VStack>
  </Flex>
)
