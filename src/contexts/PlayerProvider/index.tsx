import { createContext, useContext, useState } from 'react'

import { EpisodeData, PlayerContextData, PlayerProviderProps } from './types'

export const PlayerContext = createContext({} as PlayerContextData)

export const PlayerProvider = (props: PlayerProviderProps) => {
  const { children } = props
  const [episodesList, setEpisodesList] = useState<EpisodeData[]>([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  const playList = (list: EpisodeData[], index: number) => {
    setEpisodesList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  const play = (episode: EpisodeData) => {
    setEpisodesList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    setIsPlaying(prev => !prev)
  }

  const toggleLoop = () => {
    setIsLooping(prev => !prev)
  }
  const toggleShuffle = () => {
    setIsShuffling(prev => !prev)
  }

  const togglePlayState = (currState: boolean) => {
    setIsPlaying(currState)
  }

  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodesList.length
  const hasPrevious = currentEpisodeIndex > 0

  const playNext = () => {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodesList.length
      )
      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    } else if (hasNext) {
      setCurrentEpisodeIndex(prev => prev + 1)
    }
  }

  const playPrevious = () => {
    if (hasPrevious) {
      setCurrentEpisodeIndex(prev => prev - 1)
    }
  }

  const clearPlayerState = () => {
    setEpisodesList([])
    setCurrentEpisodeIndex(0)
    setIsPlaying(false)
  }

  const provideValues = {
    currentEpisodeIndex,
    episodesList,
    play,
    isPlaying,
    isLooping,
    toggleLoop,
    togglePlay,
    togglePlayState,
    playList,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    isShuffling,
    toggleShuffle,
    clearPlayerState,
  }
  return (
    <PlayerContext.Provider value={provideValues}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer(): PlayerContextData {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }
  return context
}
