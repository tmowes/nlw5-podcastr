import { Flex, Image } from '@chakra-ui/react'

import { ThumbnailCardProps } from './types'

export const ThumbnailCard = (props: ThumbnailCardProps) => {
  const { thumbnail, title } = props
  return (
    <Flex
      align="center"
      justify="center"
      h="20rem"
      bg="grayAlpha.100"
      borderRadius="16"
    >
      <Flex borderRadius="16" h="100%" w="100%" overflow="hidden">
        <Image src={thumbnail} alt={title} objectFit="cover" />
      </Flex>
    </Flex>
  )
}
