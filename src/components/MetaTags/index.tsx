import Head from 'next/head'

import { MetaTagsProps } from './types'

export const MetaTags = ({
  title,
  description,
  canonical,
  image,
}: MetaTagsProps) => {
  const pageTitle = title ? `${title} | podcastR` : 'podcastR'
  const pageDescription =
    description ??
    `podcastR => A app to keep you up to date with latest podcasts from tech world.`
  const pageImage = image ?? `/thumb.svg`

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="tmowes, tech, podcast" />

      <meta property="og:site_name" content="podcastR" />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={pageTitle} />
      <meta
        name="og:description"
        property="og:description"
        content={pageDescription}
      />
      <meta property="og:url" content={`${canonical}`} />
      <meta property="og:image" content={pageImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="podcastr" />
      <meta name="twitter:creator" content="Julius Mowes" />
      <meta name="twitter:image:alt" content="Thumbnail" />
      {pageImage && <meta name="twitter:image" content={pageImage} />}

      {canonical && <link rel="canonical" href={canonical} />}

      <link rel="icon" type="image/ico" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/ico" />
    </Head>
  )
}
