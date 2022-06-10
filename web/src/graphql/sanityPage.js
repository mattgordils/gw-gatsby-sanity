import { graphql } from 'gatsby'

export const query = graphql`
  fragment Page on SanityPage {
    content {
      main {
        title
        slug {
          current
        }
        modules {
          ...TextSection
          ...WideMedia
          ...FiftyFifty
          ...Columns
          ...TwoColumnText
          # plopAddModules
        }
      }
      meta {
        metaDescription
        keywords
        shareImage {
          asset {
            url
          }
        }
      }
    }
  }
`
