import * as colors from './colors'
import { lighten, darken } from 'polished'

// Themes (ThemeSelector Component)
export const themes = {
	default: {
		color: colors.textColor,
		background: colors.bgColor,
		hoverColor: colors.mainColor,
		buttonTheme: 'default',
		buttonThemeSecondary: 'lightGrey'
	},
	black: {
		color: colors.bgColor,
		background: colors.black,
		hoverColor: colors.mainColor,
		buttonTheme: 'white',
		buttonThemeSecondary: 'currentcolorOutlined'
	},
	white: {
		color: colors.textColor,
		background: colors.white,
		hoverColor: colors.mainColor,
		buttonTheme: 'default',
		buttonThemeSecondary: 'lightGrey'
	},
	lightGrey: {
		color: colors.textColor,
		background: colors.lightGrey,
		hoverColor: colors.textColor,
		buttonTheme: 'default',
		buttonThemeSecondary: 'white'
	},
	mainColor: {
		color: colors.bgColor,
		background: colors.mainColor,
		hoverColor: colors.bgColor,
		buttonTheme: 'white',
		buttonThemeSecondary: 'lightGrey'
	},
	textColor: {
		color: colors.bgColor,
		background: colors.textColor,
		hoverColor: colors.bgColor,
		buttonTheme: 'default',
		buttonThemeSecondary: 'lightGrey'
	}
}

// Button Themes
export const buttonThemes = {
	default: {
		color: colors.bgColor,
		background: colors.mainColor,
		hoverColor: colors.bgColor,
		hoverBackground: lighten(0.07, colors.mainColor)
	},
	transparent: {
		color: colors.lightTextColor,
		background: 'transparent',
		hoverColor: colors.textColor,
		hoverBackground: 'transparent'
	},
	currentcolor: {
		color: colors.textColor,
		background: 'currentcolor',
		hoverColor: 'currentcolor',
		hoverBackground: 'currentcolor'
	},
	currentcolorOutlined: {
		color: 'currentcolor',
		background: 'transparent',
		hoverColor: colors.textColor,
		hoverBackground: 'currentcolor',
		borderColor: 'currentcolor'
	},
	black: {
		color: colors.bgColor,
		background: colors.black,
		hoverColor: colors.mainColor,
		hoverBackground: darken(0.07, colors.mainColor)
	},
	white: {
		color: colors.textColor,
		background: colors.white,
		hoverColor: colors.mainColor,
		hoverBackground: colors.lightGrey
	},
	lightGrey: {
		color: colors.textColor,
		background: colors.lightGrey,
		hoverColor: colors.textColor,
		hoverBackground: darken(0.07, colors.lightGrey)
	},
	mainColor: {
		color: colors.bgColor,
		background: colors.mainColor,
		hoverColor: colors.bgColor,
		hoverBackground: lighten(0.07, colors.mainColor)
	},
	textColor: {
		color: colors.bgColor,
		background: colors.textColor,
		hoverColor: colors.bgColor,
		hoverBackground: lighten(0.2, colors.textColor)
	}
}

// Input Themes
export const inputThemes = {
	default: {
		color: colors.textColor,
		placeholderColor: colors.lightTextColor,
		background: colors.transparent,
		accentColor: colors.bgColor,
		hoverColor: colors.bgColor,
		borderColor: colors.lightTextColor,
		hoverBorderColor: colors.textColor,
		focusBorderColor: colors.mainColor,
		hoverBackground: colors.transparent,
		focusBackground: colors.transparent,
	}
}

export default themes
