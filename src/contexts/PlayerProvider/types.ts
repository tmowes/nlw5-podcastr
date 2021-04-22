import { ReactNode } from 'react'

export type PlayerContextData = {
  episodesList: EpisodeData[]
  currentEpisodeIndex: number
  isPlaying: boolean
  play: (episode: EpisodeData) => void
  togglePlay: () => void
  togglePlayState: (currState: boolean) => void
}

export type PlayerProviderProps = {
  children: ReactNode
  episodesList: EpisodeData[]
  currentEpisodeIndex: number
}

export type EpisodeData = {
  title: string
  members: string
  thumbnail: string
  duration: number
  url: string
}
