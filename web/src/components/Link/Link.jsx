import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { AppContext } from 'src/state/AppState'
import { Link as GatsbyLink } from 'gatsby'
import { AnchorLink } from 'gatsby-plugin-anchor-links'

const LinkStyles = setTheme => `
	font-size: inherit;
	text-decoration: none;
	cursor: pointer;
`

const StyledLinkElement = styled.a`
	${ ({ setTheme }) => `
		${ LinkStyles(setTheme) }
	` }
`

const StyledGatsbyLink = styled(GatsbyLink)`
	${ ({ theme }) => `
		${ LinkStyles(theme) }
	` }
`

const Link = ({ to, external, target, children, label, className, setTheme, title, pageTransition = 'fade', as }) => {
	const { setPageTransition } = useContext(AppContext)
	if (!external && to.includes('#')) {
		as = AnchorLink
	}

	if (external) {
		return (
			<StyledLinkElement
				title={title}
				className={className}
				href={to}
				target={target}
				theme={setTheme}
				rel='noopener noreferrer'
				as={as}
			>
				{children || label}
			</StyledLinkElement>
		)
	} else {
		return (
			<StyledGatsbyLink
				title={title}
				className={className}
				to={to}
				theme={setTheme}
				onClick={() => setPageTransition(pageTransition)}
				as={as}
			>
				{children || label}
			</StyledGatsbyLink>
		)
	}
}

Link.defaultProps = {
	to: '#',
	external: false,
	target: '',
	setTheme: 'alert'
}

export default Link
