import { useEffect, useRef } from 'react'

import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { MdGraphicEq } from 'react-icons/md'

import { usePlayer } from '~/contexts'

export const Player = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const {
    episodesList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    togglePlayState,
  } = usePlayer()

  useEffect(() => {
    if (!audioRef.current) {
      return
    }
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  const currentPlaying = episodesList[currentEpisodeIndex]

  return (
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

      {currentPlaying ? (
        <Flex
          align="center"
          justify="center"
          h="20rem"
          bg="grayAlpha.100"
          borderRadius="16"
        >
          <Flex borderRadius="16" h="100%" w="100%" overflow="hidden">
            <Image
              src={currentPlaying.thumbnail}
              alt={currentPlaying.title}
              objectFit="cover"
            />
          </Flex>
        </Flex>
      ) : (
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
      )}
      <VStack w="100%" alignSelf="stretch">
        <Heading fontSize="1.2rem" textAlign="center" color="gray.100">
          {currentPlaying?.title}
        </Heading>
        <Text fontSize="0.9rem" textAlign="center" color="gray.400">
          {currentPlaying?.members}
        </Text>
      </VStack>
      <VStack w="100%" alignSelf="stretch">
        <HStack w="100%" mb="4">
          <Text color="gray.400" pr="1">
            00:00
          </Text>

          <Slider
            aria-label="slider-ex-1"
            defaultValue={0}
            disabled={!currentPlaying}
          >
            <SliderTrack bg="grayAlpha.500">
              <SliderFilledTrack bg="orange.500" />
            </SliderTrack>
            <SliderThumb>
              <Box color="tomato" as={MdGraphicEq} />
            </SliderThumb>
          </Slider>

          <Text color="gray.400" pl="1">
            00:00
          </Text>
        </HStack>
        {currentPlaying && (
          <audio
            ref={audioRef}
            src={currentPlaying.url}
            autoPlay
            onPlay={() => togglePlayState(true)}
            onPause={() => togglePlayState(false)}
          />
        )}
        <HStack>
          <IconButton
            aria-label="Embaralhar"
            w="12"
            h="12"
            borderRadius="12"
            colorScheme="transparent"
            opacity={currentPlaying ? '1' : '0.5'}
            disabled={!currentPlaying}
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
            opacity={currentPlaying ? '1' : '0.5'}
            disabled={!currentPlaying}
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
            aria-label={isPlaying ? 'Parar' : 'Tocar'}
            w="12"
            h="12"
            borderRadius="12"
            colorScheme="whiteAlpha"
            opacity={currentPlaying ? '1' : '0.5'}
            disabled={!currentPlaying}
            onClick={togglePlay}
            icon={
              isPlaying ? (
                <Image src="/assets/controls/pause.svg" alt="Parar" />
              ) : (
                <Image src="/assets/controls/play.svg" alt="Tocar" />
              )
            }
          />
          <IconButton
            aria-label="Tocar proxima"
            w="12"
            h="12"
            borderRadius="12"
            colorScheme="transparent"
            opacity={currentPlaying ? '1' : '0.5'}
            disabled={!currentPlaying}
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
            opacity={currentPlaying ? '1' : '0.5'}
            disabled={!currentPlaying}
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
}
