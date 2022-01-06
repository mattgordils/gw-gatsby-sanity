import { graphql } from 'gatsby'

export const query = graphql`
  fragment Button on SanityButton {
    _key
    _type
    title
    theme
    externalLink
    newTab
    type
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
