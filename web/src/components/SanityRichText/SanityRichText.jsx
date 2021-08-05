import React from 'react'
import styled from '@emotion/styled'
import BlockContent from "@sanity/block-content-to-react"
import { Serializer } from "src/utils/serializer"

const StyledBlockContent = styled(BlockContent)`
	white-space: pre-wrap;
	* {
		white-space: pre-wrap;
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

const SanityRichText = ({text, className}) => {
	console.log(text)
	return (
		<div className={className}>
			<StyledBlockContent blocks={text?._rawText || text?.text || text} serializers={Serializer} />
		</div>
	)
}

export default SanityRichText