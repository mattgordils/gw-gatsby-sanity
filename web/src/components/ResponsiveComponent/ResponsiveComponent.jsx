import React, { Fragment } from 'react'
// import { useBreakpoint } from 'gatsby-plugin-breakpoints'

// const widthToRenderer = (breakpoints, small, medium, large, extraLarge) => {
// 	if (breakpoints.xl && extraLarge) {
// 		return extraLarge || large || medium || small
// 	} else if (breakpoints.l && large) {
// 		return large || medium || small
// 	} else if (breakpoints.md && medium) {
// 		return medium || small
// 	} else if (breakpoints.sm && small) {
// 		return small
// 	}
// }

const ResponsiveComponent = ({ small, medium, large, extraLarge }) => {
	// const breakpoints = useBreakpoint()
	// let key = 'small-content'

	// if (breakpoints.xl && extraLarge) {
	// 	key = 'extraLarge-content'
	// } else if (breakpoints.l && large) {
	// 	key = 'large-content'
	// } else if (breakpoints.md && medium) {
	// 	key = 'medium-content'
	// }

	return (
		<Fragment>
			{/*widthToRenderer(breakpoints, small, medium, large, extraLarge)*/}
			{large}
		</Fragment>
	)
}

export default ResponsiveComponent
