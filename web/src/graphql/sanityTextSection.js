import { graphql } from 'gatsby'

export const query = graphql`
  fragment TextSection on SanityTextSection {
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
