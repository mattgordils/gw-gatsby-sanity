import { graphql } from 'gatsby'

export const query = graphql`
  fragment TextSection on SanityTextSection {
    _key
    _type
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
    theme
    actions {
      ...Button
      ...Link
    }
  }
`
