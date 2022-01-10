import { graphql } from 'gatsby'

export const query = graphql`
  fragment TwoColumnText on SanityTwoColumnText {
    _key
    _type
    internalName
    theme
    leftText
    _rawRightText(resolveReferences: {maxDepth: 10})
    actions {
      ...Button
      ...Link
    }
  }
`
