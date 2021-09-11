import React from 'react'
import styled from '@emotion/styled'
import BlockContent from '@sanity/block-content-to-react'
import { Serializer } from 'src/utils/serializer'

const Wrapper = styled.div`
	> * {
		&:first-child {
			margin-top: 0;
		}
		&:last-child {
			margin-bottom: 0;
			&:empty {
				display: none;
			}
		}
	}
`

const StyledBlockContent = styled(BlockContent)`
	white-space: pre-wrap;
	* {
		white-space: pre-wrap;
	}
	.embeded-content {
		display: inline-block;
		vertical-align: top;
		margin: 20px 0;
		max-width: 800px;
	}
	h1, h2 {
		margin-top: 1.5em;
	}
	h3, h4, h5 {
		margin-top: 2.5em;
	}
	p {
		min-height: 1em;
		&.last-item {
			margin-bottom: 0;
			&:empty {
				display: none;
			}
		}
	}
	> * {
		&:first-child {
			margin-top: 0;
		}
		&:last-child {
			margin-bottom: 0;
			&:empty {
				display: none;
			}
		}
	}
`

const SanityRichText = ({ text, className }) => {
	return (
		<Wrapper className={className}>
		<StyledBlockContent className={className} blocks={text?._rawText || text?.text || text } serializers={Serializer} />
		</Wrapper>
	)
}

export default SanityRichText
