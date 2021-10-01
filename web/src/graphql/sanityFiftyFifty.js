import { graphql } from 'gatsby'

export const query = graphql`
  fragment FiftyFifty on SanityFiftyFifty {
    _key
    _type
    theme {
      title
    }
    mediaPlacement
    mediaWidth
    width
    media {
      mediaType
      image {
        asset {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
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
      _rawText(resolveReferences: {maxDepth: 10})
    }
    actions {
      ...Button
      ...Link
    }
  }
`
