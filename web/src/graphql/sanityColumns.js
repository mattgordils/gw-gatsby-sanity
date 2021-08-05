import { graphql } from 'gatsby'

export const query = graphql`
  fragment Columns on SanityColumns {
    _key
    _type
    theme
    alignment
    columns {
      icon {
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
    }
  }
`
