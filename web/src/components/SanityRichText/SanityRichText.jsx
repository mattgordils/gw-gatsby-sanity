import React from 'react'
import styled from '@emotion/styled'
import BlockContent from "@sanity/block-content-to-react"
import { Serializer } from "src/utils/serializer"

const StyledBlockContent = styled(BlockContent)`
	white-space: pre-wrap;
	* {
		white-space: pre-wrap;
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

const SanityRichText = text => {
	return (
		<StyledBlockContent blocks={text.text} serializers={Serializer} />
	)
}

export default SanityRichText