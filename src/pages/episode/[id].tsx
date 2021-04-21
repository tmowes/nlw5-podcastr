import NextLink from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'

import { FiChevronLeft } from 'react-icons/fi'
import {
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import ptBR from 'date-fns/locale/pt-BR'

import * as C from '~/components'
import { Episode, EpisodeProps } from '~/types'
import { api } from '~/services'
import { convertDurationToTimeString } from '~/utils'

export default function EpisodePage(props: EpisodeProps) {
  const {
    episode: {
      title,
      thumbnail,
      members,
      publishedAt,
      durationString,
      description,
    },
  } = props
  return (
    <>
      <C.MetaTags />
      <Flex
        flex="1"
        maxHeight="calc(100vh - 6rem)"
        overflowY="scroll"
        direction="column"
        py="12"
        px="16"
      >
        <Flex w="100%" align="center" mb="8">
          <NextLink href="/" passHref>
            <IconButton
              aria-label="Voltar"
              w="16"
              h="16"
              borderRadius="12"
              mr="-6"
              colorScheme="whiteAlpha"
              icon={
                <Icon as={FiChevronLeft} pr="1" fontSize={['16', '24', '48']} />
              }
            />
          </NextLink>
          <Image
            src={thumbnail}
            alt={title}
            w="100%"
            h="64"
            objectFit="cover"
            borderRadius="3xl"
          />
          <IconButton
            aria-label="Tocar"
            w="16"
            h="16"
            borderRadius="12"
            ml="-6"
            colorScheme="whiteAlpha"
            icon={
              <Image src="/assets/play-orange.svg" boxSize="10" alt="Tocar" />
            }
          />
        </Flex>
        <Flex px="16" direction="column">
          <Heading mb="6">{title}</Heading>
          <HStack>
            <Text
              textAlign="left"
              fontSize="0.875rem"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              maxW="100%"
            >
              {members}
            </Text>
            <Text>•</Text>
            <Text whiteSpace="nowrap" textAlign="center" fontSize="0.875rem">
              {publishedAt}
            </Text>
            <Text>•</Text>
            <Text fontSize="0.875rem">{durationString}</Text>
          </HStack>
          <Divider mt="2" mb="6" />
          <Text dangerouslySetInnerHTML={{ __html: description }} />
        </Flex>
      </Flex>
    </>
  )
}
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})

export const getStaticProps: GetStaticProps<EpisodeProps> = async ({
  params,
}) => {
  const id = String(params.id)

  const { data } = await api.get<Episode>(`episodes/${id}`)

  const episode = {
    id,
    title: data.title,
    members: data.members,
    thumbnail: data.thumbnail,
    description: data.description,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR,
    }),
    duration: data.file.duration,
    durationString: convertDurationToTimeString(data.file.duration),
    url: data.file.url,
  }

  return {
    props: {
      episode,
    },
    revalidate: 24 * 60 * 60, // 8 hours
  }
}
