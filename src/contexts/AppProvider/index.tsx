import { PlayerProvider } from '..'

import { AppProviderProps } from './types'

export const AppProvider = ({ children }: AppProviderProps) => (
  <PlayerProvider currentEpisodeIndex={0} episodesList={[]}>
    {children}
  </PlayerProvider>
)
