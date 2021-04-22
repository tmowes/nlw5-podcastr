import { createContext, useContext, useState } from 'react'

import { EpisodeData, PlayerContextData, PlayerProviderProps } from './types'

export const PlayerContext = createContext({} as PlayerContextData)

export const PlayerProvider = (props: PlayerProviderProps) => {
  const { children } = props
  const [episodesList, setEpisodesList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const play = (episode: EpisodeData) => {
    setEpisodesList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    setIsPlaying(prev => !prev)
  }

  const togglePlayState = (currState: boolean) => {
    setIsPlaying(currState)
  }

  const provideValues = {
    currentEpisodeIndex,
    episodesList,
    play,
    isPlaying,
    togglePlay,
    togglePlayState,
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
