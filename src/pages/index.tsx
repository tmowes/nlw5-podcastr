import { GetStaticProps } from 'next'
import NextLink from 'next/link'

import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import ptBR from 'date-fns/locale/pt-BR'
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

import * as C from '~/components'
import { api } from '~/services'
import { Episode, HomeProps } from '~/types'
import { convertDurationToTimeString } from '~/utils'
import { usePlayer } from '~/contexts'

export default function Home(props: HomeProps) {
  const { latestEpisodes, allEpisodes } = props
  const { playList } = usePlayer()

  const episodesList = [...latestEpisodes, ...allEpisodes]

  return (
    <>
      <C.MetaTags title="Home" />
      <Flex
        flex="1"
        maxHeight="calc(100vh - 6rem)"
        overflowY="scroll"
        direction="column"
        py="12"
        px="16"
      >
        <Heading textAlign="left" mb="6">
          Últimos lançamentos
        </Heading>
        <SimpleGrid
          mb="12"
          minChildWidth={['600px']}
          columnGap={['0', '6']}
          rowGap={['4', '6']}
          gridTemplateColumns={[
            'repeat(auto-fit, minmax(600px))',
            'repeat(auto-fit, minmax(600px, 1fr))',
          ]}
          justifyItems="center"
        >
          {latestEpisodes.map((latestEpisode, index) => (
            <C.EpisodeCard
              key={latestEpisode.id}
              index={index}
              latestEpisode={latestEpisode}
              episodesList={episodesList}
            />
          ))}
        </SimpleGrid>
        <Heading textAlign="left" mb="6">
          Todos episodes
        </Heading>

        <Table colorScheme="whiteAlpha" cellSpacing={0}>
          <Thead>
            <Tr>
              <Th />
              <Th textTransform="uppercase">Podcast</Th>
              <Th textTransform="uppercase" textAlign="center" minW="24">
                Data
              </Th>
              <Th textTransform="uppercase" textAlign="center" minW="24">
                Duração
              </Th>
              <Th w="6" />
            </Tr>
          </Thead>
          <Tbody>
            {allEpisodes.map(
              (
                { id, thumbnail, title, members, publishedAt, durationString },
                index
              ) => (
                <Tr key={id}>
                  <Td>
                    <Image
                      src={thumbnail}
                      alt={title}
                      boxSize="12"
                      objectFit="cover"
                      borderRadius="2xl"
                    />
                  </Td>
                  <Td>
                    <Box>
                      <NextLink href={`/episode/${id}`} passHref>
                        <Link
                          fontSize="1.15rem"
                          fontWeight="bold"
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

                      <Text fontSize="sm" color="gray.300">
                        {members}
                      </Text>
                    </Box>
                  </Td>
                  <Td textTransform="capitalize" textAlign="center" minW="24">
                    {publishedAt}
                  </Td>
                  <Td>{durationString}</Td>
                  <Td>
                    <IconButton
                      aria-label="Tocar"
                      w="12"
                      h="12"
                      borderRadius="12"
                      ml="0"
                      onClick={() =>
                        playList(episodesList, index + latestEpisodes.length)
                      }
                      colorScheme="whiteAlpha"
                      icon={<Image src="/assets/play-orange.svg" alt="Tocar" />}
                    />
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </Flex>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { data } = await api.get<Episode[]>('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  })

  const episodes = data.map(
    ({ id, title, members, thumbnail, description, published_at, file }) => ({
      id,
      title,
      members,
      thumbnail,
      description,
      publishedAt: format(parseISO(published_at), 'd MMM yy', {
        locale: ptBR,
      }),
      duration: file.duration,
      durationString: convertDurationToTimeString(file.duration),
      url: file.url,
    })
  )

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 8 * 60 * 60, // 8 hours
  }
}
