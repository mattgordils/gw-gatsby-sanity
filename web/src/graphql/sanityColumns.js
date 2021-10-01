import { graphql } from 'gatsby'

export const query = graphql`
  fragment Columns on SanityColumns {
    _key
    _type
    theme {
      title
    }
    alignment
    introText {
      eyebrow
      _rawText
    }
    actions {
      ...Button
      ...Link
    }
    columns {
      image {
        asset {
          gatsbyImageData(placeholder: NONE)
          url
          title
          altText
          originalFilename
        }
      }
      text {
        eyebrow
        _rawText(resolveReferences: {maxDepth: 10})
      }
    }
  }
`
