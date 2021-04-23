import { FormattedEpisode } from '~/types'

export type EpisodeCardProps = {
  index: number
  latestEpisode: FormattedEpisode
  episodesList: FormattedEpisode[]
}
