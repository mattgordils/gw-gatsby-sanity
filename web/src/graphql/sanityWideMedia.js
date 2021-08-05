import { graphql } from 'gatsby'

export const query = graphql`
  fragment WideMedia on SanityWideMedia {
    _key
    _type
    width
    height
    media {
      mediaType
      image {
        asset {
          gatsbyImageData(layout: FULL_WIDTH)
          url
          title
          altText
          originalFilename
        }
        hotspot {
          width
          height
          x
          y
        }
        crop {
          top
          bottom
          left
          right
        }
      }
      video {
        asset {
          title
          url
        }
      }
    }
    text {
      eyebrow
      text {
        _type
        _key
        children {
          _type
          _key
          text
          marks
        }
        style
        list
      }
    }
    alignment
    actions {
      ...Button
      ...Link
    }
    overlayPlacementVertical
    overlayPlacementHorizontal
  }
`
