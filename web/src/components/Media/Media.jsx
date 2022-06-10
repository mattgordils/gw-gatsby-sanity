import React from 'react'
import styled from '@emotion/styled'
import Image from 'src/components/Image'
import Video from 'src/components/Video'

const MediaVideo = styled(Video)`
  ${ ({ ratio }) => ratio ? `
    position: relative;
    > div > div {
      height: 100%;
      padding-bottom: ${ ratio * 100 }%;
    }
    video {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;
    }
  ` : '' }
`
const MediaImage = styled(Image)`
  ${ ({ ratio }) => ratio ? `
    > div:first-of-type {
      padding-top: ${ ratio * 100 }% !important;
    }
  ` : '' }
`

const Media = ({
  className,
  media,
  altText,
  loading,
  ratio,
  sizes
}) => {
  const image = media?.image?.asset
  const video = media?.video?.asset

  if (!image && !video) {
    return false
  }

  if (media.mediaType === 'video') {
    return (
      <MediaVideo
        src={video?.url}
        ratio={ratio}
      />
    )
  } else if (media.mediaType === 'image') {
    return (
      <MediaImage
        image={image?.gatsbyImageData}
        media={image?.gatsbyImageData}
        loading={loading || 'lazy'}
        alt={altText}
        sizes={sizes}
        ratio={ratio}
        format={['auto', 'avif', 'webp']}
      />
    )
  } else {
    return false
  }
}

export default Media
