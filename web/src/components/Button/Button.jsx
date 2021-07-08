import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { rgba } from 'polished'
import * as util from 'src/styles/util'
import { colors, typography, animations } from 'src/styles'
import { buttonThemes as themes } from 'src/styles/themes'
import MaterialIcon from 'src/components/MaterialIcon'
import Spinner from 'react-spinner-material'
import { MdCheck, MdClose } from 'react-icons/md'
import { baseBorderRadius, uiElementSizes } from 'src/styles/globals'
import Link from 'src/components/Link'

const buttonSettings = {
	radius: baseBorderRadius,
	border: '2px solid',
	transitionSpeed: animations.mediumSpeed,
	verticalOffset: '1px'
}

const getState = (loading, error, success, disabled) => {
	let buttonState = ''
	if (error) {
		buttonState = 'error'
	} else if (loading === 'true') {
		buttonState = 'loading'
	} else if (success) {
		buttonState = 'success'
	} else if (disabled) {
		buttonState = 'disabled'
	}

	return buttonState
}

const setButtonTheme = (theme, state) => `
	color: ${ themes[theme].color };
	background: ${ themes[theme].background };
	${ theme.shadow ? `
		box-shadow: ${ theme.shadow };
	` : `
		box-shadow: none;
	` }
	${ themes[theme].borderColor ? `
		border-color: ${ themes[theme].borderColor };
	` : `
		border-color: ${ themes[theme].background };
	` }
	&:hover {
		${ !state ? `
			color: ${ themes[theme].hoverColor };
			background: ${ themes[theme].hoverBackground };
			${ themes[theme].borderHoverColor ? `
				border-color: ${ themes[theme].borderHoverColor };
			` : `
				border-color: ${ themes[theme].hoverBackground };
			` }
			${ theme.hoverShadow ? `
				box-shadow: ${ theme.hoverShadow };
			` : '' }
		` : '' }
	}
`

const DisabledButtonStyles = () => `
	&[disabled],
	&:disabled {
		opacity: .3;
		mix-blend-mode: luminosity;
		cursor: not-allowed;
	}
`

const ButtonIcon = styled.div`
	${ ({ position }) => position === 'left' ? `
		margin-right: .5em;
	` : `
		margin-left: .5em;
	` }
	span,
	svg {
		display: block;
	}
`

const ButtonStyles = (state, shape, size, theme) => (`
	appearance: none;
	-webkit-tap-highlight-color: rgba(0,0,0,0);
	-webkit-touch-callout: none;
	outline: none;
	cursor: pointer;
	display: inline-block;
	vertical-align: middle;
	border: ${ buttonSettings.border };
	${ util.responsiveStyles('height', uiElementSizes[size] * 1.3, uiElementSizes[size], uiElementSizes[size], uiElementSizes[size]) }
	padding: 0 calc(${ uiElementSizes[size] }px * .5) ${ buttonSettings.verticalOffset };
	min-width: calc(${ uiElementSizes[size] }px * 2);
	text-transform: none;
	letter-spacing: 0;
	border-radius: ${ buttonSettings.radius }px;
	${ util.responsiveStyles('font-size', 20, 16, 15, 13) }
	text-align: center;
	${ typography.buttonStyle }
	line-height: 1em;
	${ util.fontSmoothing }
	transition: background ${ buttonSettings.transitionSpeed } ease-in-out,
							color ${ buttonSettings.transitionSpeed } ease-in-out,
							border ${ buttonSettings.transitionSpeed } ease-in-out,
							box-shadow ${ buttonSettings.transitionSpeed } ease-in-out,
							transform ${ buttonSettings.transitionSpeed } ease-in-out,
							opacity ${ buttonSettings.transitionSpeed } ease-in-out;
	// Button States
	${ state === 'loading' ? 'cursor: wait; pointer-events: none;' : '' }
	${ state === 'error' || state === 'success' ? 'cursor: default; pointer-events: none;' : '' }

	// Button Shapes
	${ shape ? `
		${ shape.includes('circle') || shape.includes('square') ? `
			padding: 0 !important;
			${ util.responsiveStyles('width', uiElementSizes[size] * 1.3, uiElementSizes[size], uiElementSizes[size], uiElementSizes[size]) }
			${ util.responsiveStyles('min-width', uiElementSizes[size] * 1.3, uiElementSizes[size], uiElementSizes[size], uiElementSizes[size]) }
			${ ButtonIcon } {
				margin: 0;
			}
		` : '' }
		${ shape === 'block' ? 'display: block; width: 100%;' : '' }
	` : '' }
	${ shape && shape.includes('circle') ? 'border-radius: 50%;' : '' }

	// Button Themes
	${ setButtonTheme(theme, state) }
	${ state === 'disabled' ? `${ DisabledButtonStyles() }` : '' }

	// Button Size Tweaks
	${ size === 'small' ? 'font-size: inherit;' : '' }
	${ size === 'tiny' ? 'font-size: inherit;' : '' }
`)

const ButtonContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 100%;
	svg {
		* {
			fill: currentcolor;
		}
	}
`

const StyledButtonLink = styled(Link)`
	${ ({ loading, error, success, disabled, shape, size, theme }) => ButtonStyles(getState(loading, error, success, disabled), shape, size, theme) }
`

const StyledButtonElement = styled.button`
	${ ({ loading, error, success, disabled, shape, size, theme }) => ButtonStyles(getState(loading, error, success, disabled), shape, size, theme) }
`

class Button extends Component {
	renderIcon = (icon, position, shape, size) => {
		let renderedIcon = false
		if (typeof icon === 'string') {
			renderedIcon = <ButtonIcon size={size} position={position} shape={shape}><MaterialIcon size={this.props.size === 'tiny' ? '18px' : '24px'}>{icon}</MaterialIcon></ButtonIcon>
		} else {
			renderedIcon = <ButtonIcon size={size} position={position} shape={shape}>{icon}</ButtonIcon>
		}
		return renderedIcon
	}

	renderButtonContent = () => {
		const { loading, error, success, children, label, icon, iconPosition, shape, size } = this.props
		if (loading) {
			return <ButtonContent>
				<Spinner radius={18} color='inherit' stroke={2} />
			</ButtonContent>
		} else if (error) {
			return <ButtonContent>
				<MdClose size={'1.5em'} />
			</ButtonContent>
		} else if (success) {
			return <ButtonContent>
				<MdCheck size={'1.5em'} />
			</ButtonContent>
		} else {
			return <ButtonContent>
				{icon && iconPosition !== 'right' ? this.renderIcon(icon, iconPosition, shape, size) : false}
				{children || label}
				{icon && iconPosition === 'right' ? this.renderIcon(icon, iconPosition, shape, size) : false}
			</ButtonContent>
		}
	}

	render () {
		const {
			to,
			external,
			target,
			icon,
			iconPosition,
			loading,
			error,
			success,
			disabled,
			onClick,
			setTheme,
			className,
			shape,
			size,
			title,
			name
		} = this.props

		if (to) {
			return (
				<StyledButtonLink
					className={className}
					to={to}
					target={target}
					external={external}
					icon={icon}
					iconPosition={iconPosition}
					loading={loading ? loading.toString() : 'false'}
					error={error}
					success={success}
					disabled={disabled}
					onClick={onClick}
					theme={setTheme || 'default'}
					shape={shape}
					size={size}
					title={title}
					name={name || title}
					aria-label={name || title}
					rel={external ? 'noopener noreferrer' : ''}
				>
					{this.renderButtonContent()}
				</StyledButtonLink>
			)
		} else {
			return (
				<StyledButtonElement
					className={className}
					icon={icon}
					iconPosition={iconPosition}
					loading={loading ? loading.toString() : 'false'}
					error={error}
					success={success}
					disabled={disabled}
					onClick={onClick}
					theme={setTheme || 'default'}
					shape={shape}
					size={size}
					title={title}
					name={name || title}
					aria-label={name || title}
				>
					{this.renderButtonContent()}
				</StyledButtonElement>
			)
		}
	}
}

Button.defaultProps = {
	setTheme: 'default',
	size: 'medium',
	shape: 'default',
	iconPosition: 'left'
}

const themeKeys = Object.keys(themes).toString()

Button.propTypes = {
  /** What theme to use. (src/styles/themes.js) */
  setTheme: PropTypes.string,
  /** How large should the button be? */
  size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']),
  /** How large should the button be? */
  shape: PropTypes.oneOf(['default', 'square', 'circle', 'block']),
  /** Button contents */
  label: PropTypes.string,
  /** Link a button to internal route */
  to: PropTypes.string,
  /** Optional click handler */
  external: PropTypes.bool,
  /** Optional click handler */
  onClick: PropTypes.func,
  /** Can be a string coresponding to <a href="https://fonts.google.com/icons?selected=Material+Icons" target="_blank">Material Icons</a> or a custom component or SVG */
	icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/** iconPos */
	iconPosition: PropTypes.oneOf(['left', 'right']),
	/** loading */
	loading: PropTypes.bool,
	/** error */
	error: PropTypes.bool,
	/** success */
	success: PropTypes.bool,
	disabled: PropTypes.bool,
	/** Used for title, name, aria-label attributes. Use when there is no label or children */
	title: PropTypes.string
}

export default Button
