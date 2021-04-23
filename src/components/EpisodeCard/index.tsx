import NextLink from 'next/link'

import {
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'

import { usePlayer } from '~/contexts'

import { EpisodeCardProps } from './types'

export const EpisodeCard = (props: EpisodeCardProps) => {
  const { index, latestEpisode, episodesList } = props
  const {
    thumbnail,
    title,
    id,
    members,
    publishedAt,
    durationString,
  } = latestEpisode
  const { playList } = usePlayer()
  return (
    <Flex
      align="center"
      justify="space-between"
      bg="gray.800"
      borderRadius="3xl"
      p="5"
      w="100%"
    >
      <Image
        src={thumbnail}
        alt={title}
        boxSize="24"
        objectFit="cover"
        borderRadius="2xl"
      />
      <VStack ml="4" w="100%" align="start">
        <NextLink href={`/episode/${id}`} passHref>
          <Link
            fontSize="1.25rem"
            noOfLines={1}
            textOverflow="ellipsis"
            cursor="pointer"
            _hover={{
              color: 'orange.500',
            }}
          >
            {title}
          </Link>
        </NextLink>
        <HStack w="100%" justify="space-between">
          <VStack align="start" maxW="70%">
            <Text
              fontSize="0.875rem"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              maxW="100%"
            >
              {members}
            </Text>
            <Text fontSize="0.875rem">{`${publishedAt} • ${durationString}`}</Text>
          </VStack>
          <IconButton
            aria-label="Tocar"
            w="12"
            h="12"
            borderRadius="12"
            ml="0"
            colorScheme="whiteAlpha"
            onClick={() => playList(episodesList, index)}
            icon={<Image src="/assets/play-orange.svg" alt="Tocar" />}
          />
        </HStack>
      </VStack>
    </Flex>
  )
}
