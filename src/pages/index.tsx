import { GetStaticProps } from 'next'

import { Flex, Heading, Text } from '@chakra-ui/react'

import * as C from '~/components'
import { api } from '~/services'
import { Episode, HomeProps } from '~/types'

export default function Home({ episodes }: HomeProps) {
  return (
    <>
      <C.MetaTags />
      <Flex w="100%" h="100%" align="center" direction="column">
        <Heading as="h1">Julius</Heading>
        <Heading as="h2">Julius</Heading>
        <Heading as="h3">Julius</Heading>
        <Text>{JSON.stringify(episodes)}</Text>
      </Flex>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { data } = await api.get<Episode[]>('/episodes')
  return {
    props: {
      episodes: data,
    },
    revalidate: 8 * 60 * 60, // 8 hours
  }
}
