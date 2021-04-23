import { ReactNode } from 'react'

export type PlayerContextData = {
  episodesList: EpisodeData[]
  currentEpisodeIndex: number
  isPlaying: boolean
  isLooping: boolean
  isShuffling: boolean
  hasNext: boolean
  hasPrevious: boolean
  toggleLoop: () => void
  toggleShuffle: () => void
  togglePlay: () => void
  togglePlayState: (currState: boolean) => void
  play: (episode: EpisodeData) => void
  playList: (list: EpisodeData[], index: number) => void
  playNext: () => void
  playPrevious: () => void
  clearPlayerState: () => void
}

export type PlayerProviderProps = {
  children: ReactNode
}

export type EpisodeData = {
  title: string
  members: string
  thumbnail: string
  duration: number
  url: string
}
