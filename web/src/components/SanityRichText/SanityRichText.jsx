import React from 'react'
import styled from '@emotion/styled'
import BlockContent from '@sanity/block-content-to-react'
import { Serializer } from 'src/utils/serializer'
import { typography } from 'src/styles'

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
		display: block;
		margin-top: 20px;
		margin-bottom: 20px;
		max-width: 800px;
		width: 100%;
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
	ol, ul {
		padding: 0;
		list-style: none;
		margin-top: 1em;
		margin-bottom: 1em;
		counter-reset: item;
		text-align: left;
		li {
			counter-increment: item;
			&:before {
	      position: absolute;
	      top: 0;
	      left: 0;
	    }
		}
	}
	ul li {
		position: relative;
		padding-left: 1em;
		margin: .75em 0;
		&:before {
			position: absolute;
			top: 0.75em;
			margin-top: -3px;
			border-radius: 50%;
			content: '';
			display: block;
			width: 6px;
			height: 6px;
			background: currentcolor;
		}
	}
	ol li {
		position: relative;
		padding-left: 1em;
		margin: .75em 0;
		&:before {
			position: absolute;
			text-align: right;
			top: 0;
			left: 0;
			width: .5em;
			font-size: .75em;
			font-weight: ${ typography.bold };
			content: counter(item);
			display: block;
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
