export type HomeProps = {
  latestEpisodes: FormattedEpisode[]
  allEpisodes: FormattedEpisode[]
}

export type EpisodeProps = {
  episode: FormattedEpisode
}

export type FormattedEpisode = {
  id: string
  title: string
  members: string
  publishedAt: string
  thumbnail: string
  description: string
  duration: number
  durationString: string
  url: string
}

export type Episode = {
  id: string
  title: string
  members: string
  published_at: string
  thumbnail: string
  description: string
  file: File
}

export type File = {
  url: string
  type: string
  duration: number
}
