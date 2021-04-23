import { useEffect, useRef, useState } from 'react'

import {
  Box,
  Flex,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { MdGraphicEq } from 'react-icons/md'

import { usePlayer } from '~/contexts'
import { convertDurationToTimeString } from '~/utils'

import { Header } from './Header'
import { EmptyCard } from './EmptyCard'
import { Info } from './Info'
import { ThumbnailCard } from './ThumbnailCard'
import { Controls } from './Controls'

export const Player = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)

  const {
    episodesList,
    currentEpisodeIndex,
    isPlaying,
    togglePlayState,
    playNext,
    hasNext,
    isLooping,
    clearPlayerState,
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

  const setupProgressListener = () => {
    audioRef.current.currentTime = 0

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  }

  const handleSeek = (amount: number) => {
    audioRef.current.currentTime = amount
    setProgress(amount)
  }

  const handleEpisodeEnded = () => {
    if (hasNext) {
      playNext()
    } else {
      setProgress(0)
      clearPlayerState()
    }
  }

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
      <Header />

      {currentPlaying ? (
        <ThumbnailCard
          thumbnail={currentPlaying.thumbnail}
          title={currentPlaying.title}
        />
      ) : (
        <EmptyCard />
      )}
      {currentPlaying && (
        <Info title={currentPlaying.title} members={currentPlaying.members} />
      )}

      <VStack w="100%" alignSelf="stretch">
        <HStack w="100%" mb="4">
          <Text color="gray.400" pr="1" fontSize="15px" fontFamily="monospace">
            {convertDurationToTimeString(progress)}
          </Text>

          <Slider
            aria-label="slider-ex-1"
            defaultValue={0}
            value={progress}
            onChange={handleSeek}
            min={0}
            max={currentPlaying?.duration ?? 100}
            disabled={!currentPlaying}
          >
            <SliderTrack bg="grayAlpha.500">
              <SliderFilledTrack bg="orange.500" />
            </SliderTrack>
            <SliderThumb>
              <Box color="tomato" as={MdGraphicEq} />
            </SliderThumb>
          </Slider>

          <Text color="gray.400" fontSize="15px" fontFamily="monospace" pl="1">
            {convertDurationToTimeString(currentPlaying?.duration ?? 0)}
          </Text>
        </HStack>
        {currentPlaying && (
          <audio
            ref={audioRef}
            src={currentPlaying.url}
            autoPlay
            loop={isLooping}
            onEnded={handleEpisodeEnded}
            onPlay={() => togglePlayState(true)}
            onPause={() => togglePlayState(false)}
            onLoadedMetadata={setupProgressListener}
          />
        )}
        <Controls currentPlaying={currentPlaying} />
      </VStack>
    </Flex>
  )
}
