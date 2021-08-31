import React, { useEffect } from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
`

const EmbedCode = ({ className, embedCode }) => (
	<Wrapper className={className}>
		{embedCode}
	</Wrapper>
)

export default EmbedCode
