import { graphql } from 'gatsby'

export const query = graphql`
  fragment WideMedia on SanityWideMedia {
    _key
    _type
    width
    media {
      mediaType
      image {
        asset {
          gatsbyImageData
          url
          title
          altText
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
