import React from 'react'
import styled from '@emotion/styled'
import themes from 'src/styles/themes'
import { rgba } from 'polished'

const ThemeWrapper = styled.div`
	${ ({ 'data-theme': setTheme }) => (setTheme && setTheme !== 'bgColor' && themes[setTheme]) && `
		background-color: ${ themes[setTheme].background };
		color: ${ themes[setTheme].color };
		*::selection {
	    background: ${ rgba(themes[setTheme].hoverColor, 0.9) };
	    color: ${ themes[setTheme].background };
	  }
	  p a {
	  	border-color: ${ rgba(themes[setTheme].color, 0.25) };
	  	&:hover {
	  		border-color: ${ themes[setTheme].hoverColor };
	  	}
	  }
	` }
`

const ThemeSelector = ({ className, setTheme = 'default', ...rest }) => {
	if (!setTheme || setTheme === null) {
		setTheme = 'default'
	}
	return (
		<ThemeWrapper
			data-theme={setTheme}
			className={className}
			{...rest}
		/>
	)
}

export default ThemeSelector
