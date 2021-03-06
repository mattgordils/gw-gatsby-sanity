import { graphql } from 'gatsby'

export const query = graphql`
  fragment Link on SanityLink {
    _key
    _type
    title
    externalLink
    newTab
    type
    linkSection
    link {
    	content {
    		main {
    			slug {
    				current
    			}
    		}
    	}
    }
  }
`
