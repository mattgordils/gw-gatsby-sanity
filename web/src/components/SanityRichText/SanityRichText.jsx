import React from 'react'
import BlockContent from "@sanity/block-content-to-react"
import { Serializer } from "src/utils/serializer"

const StandardText = text => {
	return (
		<div>
			<h1>Sanity Rich Text</h1>
			<BlockContent blocks={text.text} serializers={Serializer} />
		</div>
	)
}

export default StandardText