import { graphql } from 'gatsby'

export const query = graphql`
  fragment FiftyFifty on SanityFiftyFifty {
    _key
    _type
    theme
    mediaPlacement
    mediaWidth
    width
    media {
      mediaType
      image {
        asset {
          gatsbyImageData
          url
          title
          altText
          originalFilename
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
    actions {
      ...Button
      ...Link
    }
  }
`
