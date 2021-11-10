import { graphql } from 'gatsby'

export const query = graphql`
  fragment FiftyFifty on SanityFiftyFifty {
    _key
    _type
    theme
    mediaPlacement
    mediaWidth
    width
    textAlignment
    media {
      ...Media
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
