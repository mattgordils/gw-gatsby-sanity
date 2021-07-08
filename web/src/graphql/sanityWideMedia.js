import { graphql } from 'gatsby'

export const query = graphql`
  fragment WideMedia on SanityImageModule {
    _key
    _type
  }
`
