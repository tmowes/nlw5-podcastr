import { useMemo } from 'react'

import { Divider, Flex, Image, Text } from '@chakra-ui/react'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

export const Header = () => {
  const currentDate = useMemo(
    () => format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR }),
    []
  )

  return (
    <Flex bg="gray.800" w="100%">
      <Flex
        as="header"
        w="100%"
        maxW={1240}
        h={['12', '24']}
        ml="auto"
        px={['4', '8', '16']}
      >
        <Image
          src="/assets/logo.svg"
          alt="podcastr logo"
          h={['4', '10']}
          my="auto"
        />
        <Divider
          orientation="vertical"
          m="8"
          h={['4', '8']}
          colorScheme="orange"
        />
        <Text my="auto">O melhor para você ouvir, sempre</Text>
        <Text my="auto" ml="auto" textTransform="capitalize">
          {currentDate}
        </Text>
      </Flex>
    </Flex>
  )
}
