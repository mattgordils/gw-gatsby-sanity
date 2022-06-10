import { graphql } from 'gatsby'

export const query = graphql`
  fragment Columns on SanityColumns {
    _key
    _type
    internalName
    theme
    alignment
    hidden
    introText {
      eyebrow
      _rawText
    }
    actions {
      ...Button
      ...Link
    }
    imageSize
    columns {
      image {
        asset {
          gatsbyImageData(placeholder: NONE, layout: FULL_WIDTH, width: 750)
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
