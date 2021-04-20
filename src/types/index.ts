export type HomeProps = {
  episodes: Episode[]
}

export type Episode = {
  id: string
  title: string
  members: string
  published_at: Date
  thumbnail: string
  description: string
  file: File
}

export type File = {
  url: string
  type: string
  duration: number
}
