import { graphql } from 'gatsby'

export const query = graphql`
  fragment StandardText on SanityStandardText {
    _key
    _type
    text {
      _key
      _type
      style
      list
      children {
      	_key
		    _type
      	text
      }
    }
  }
`
