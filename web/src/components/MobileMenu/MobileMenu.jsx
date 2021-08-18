import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Link from 'src/components/Link'
import Grid from 'src/components/Grid'
import ThemeSelector from 'src/components/ThemeSelector'
import ScrollEntrance from 'src/components/ScrollEntrance'
import { colors, typography, util } from 'src/styles'
import { Transition } from 'react-transition-group'
import { getSlugLink } from 'src/utils/format'

const timeout = 300
const timingFunction = 'cubic-bezier(0.44, 0.24, 0.16, 1.00)'

const Wrapper = styled(ThemeSelector)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 3;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	overflow: auto;
	-webkit-overflow-scrolling: touch;
	background: ${ colors.lightGrey };
	${ util.responsiveStyles('padding-top', 113, 105, 90, 50) }
	transition: opacity ${ timeout }ms ${ timingFunction }, transform ${ timeout }ms ${ timingFunction };
	// transform: translate3d(110%, 0, 0);
	opacity: 0;
	${ ({ transitionStatus }) => transitionStatus === 'exited' && `
		// transform: translate3d(110%, 0, 0);
		opacity: 0;
	` }
	${ ({ transitionStatus }) => transitionStatus === 'entered' && `
		// transform: none;
		opacity: 1;
	` }
`

const MobileNavLink = styled(Link)`
	${ ({ size }) => size ? `${ typography[size] }` : typography.h2 }
	${ ({ size }) => size === 'smallCaps' && `
		margin-top: 20px;
	` }
	display: block;
	padding: 2px 0;
	color: ${ colors.textColor };
	span {
		display: inline-block;
	}
`

const MainSection = styled.div`
	flex-grow: 1;
	flex-shrink: 0;
	display: flex;
	align-items: center;
	padding: 5vw 0 0;
`

const MobileMenu = ({
	open,
	toggleMobileMenu,
	navLinks = [],
	footerColumn1,
	footerColumn2,
	pathname
}) => {
	return (
		<Transition
			in={open}
			timeout={{
				enter: 1,
				exit: timeout
			}}
			unmountOnExit
			mountOnEnter
		>
			{transitionStatus => (
				<Wrapper transitionStatus={transitionStatus}>
					<MainSection>
						<Grid small="1 [12] 1">
							<ScrollEntrance>
								{navLinks.map((item, index) => {
									const link = getSlugLink(item?.link)
									const externalLink = item.externalLink
									return (
										<div>
											<MobileNavLink
												external={externalLink}
												to={externalLink || link}
												active={'/' + pathname === link}
												key={link}
												type={item._type}
											>
												<span onClick={() => '/' + pathname === link ? toggleMobileMenu(false) : setTimeout(() => toggleMobileMenu(false), 500)}>{item.title}</span>
											</MobileNavLink>
										</div>
									)
								})}
							</ScrollEntrance>
						</Grid>
					</MainSection>
				</Wrapper>
			)}
		</Transition>
	)
}

MobileMenu.propTypes = {
	/** Is the menu open or closed? */
	open: PropTypes.bool,
	navLinks: PropTypes.array
}

export default MobileMenu
