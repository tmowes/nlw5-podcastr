import { HStack, IconButton, Image } from '@chakra-ui/react'

import { usePlayer } from '~/contexts'

import { ControlsProps } from './types'

export const Controls = (props: ControlsProps) => {
  const { currentPlaying } = props
  const {
    episodesList,
    isPlaying,
    togglePlay,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    isLooping,
    toggleLoop,
    isShuffling,
    toggleShuffle,
  } = usePlayer()

  return (
    <HStack>
      <IconButton
        aria-label="Embaralhar"
        w="12"
        h="12"
        borderRadius="12"
        colorScheme="transparent"
        opacity={isShuffling ? '1' : '0.5'}
        disabled={!currentPlaying || episodesList.length === 1}
        onClick={toggleShuffle}
        icon={
          <Image
            src="/assets/controls/shuffle.svg"
            w="5"
            h="5"
            filter={
              isShuffling
                ? 'brightness(0.6) invert(0.35) sepia(1) saturate(3) hue-rotate(350deg)'
                : ''
            }
            _hover={{
              filter: isShuffling
                ? 'brightness(1) invert(0.35) sepia(1) saturate(3) hue-rotate(350deg)'
                : '',
            }}
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
        disabled={!currentPlaying || !hasPrevious}
        onClick={playPrevious}
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
            <Image
              src="/assets/controls/pause.svg"
              alt="Parar"
              filter="brightness(0.6) invert(0.35) sepia(1) saturate(3) hue-rotate(350deg)"
              _hover={{
                filter:
                  'brightness(1) invert(0.35) sepia(1) saturate(3) hue-rotate(350deg)',
              }}
            />
          ) : (
            <Image
              src="/assets/controls/play.svg"
              alt="Tocar"
              filter="brightness(0.6) invert(0.35) sepia(1) saturate(3) hue-rotate(350deg)"
              _hover={{
                filter:
                  'brightness(1) invert(0.35) sepia(1) saturate(3) hue-rotate(350deg)',
              }}
            />
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
        disabled={!currentPlaying || !hasNext}
        onClick={playNext}
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
        opacity={isLooping ? '1' : '0.5'}
        disabled={!currentPlaying}
        onClick={toggleLoop}
        icon={
          <Image
            src="/assets/controls/repeat.svg"
            w="5"
            h="5"
            filter={
              isLooping
                ? 'brightness(0.6) invert(0.35) sepia(1) saturate(3) hue-rotate(350deg)'
                : ''
            }
            _hover={{
              filter: isLooping
                ? 'brightness(1) invert(0.35) sepia(1) saturate(3) hue-rotate(350deg)'
                : '',
            }}
            alt="Repetir"
          />
        }
      />
    </HStack>
  )
}
