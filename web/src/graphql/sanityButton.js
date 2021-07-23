import { graphql } from 'gatsby'

export const query = graphql`
  fragment Button on SanityButton {
    _key
    _type
    title
    theme
    externalLink
    newTab
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
