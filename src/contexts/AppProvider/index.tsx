import { PlayerProvider } from '..'

import { AppProviderProps } from './types'

export const AppProvider = ({ children }: AppProviderProps) => (
  <PlayerProvider>{children}</PlayerProvider>
)
