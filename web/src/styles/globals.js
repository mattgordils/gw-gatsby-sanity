import * as util from './util'

export const verticalMargins = `
	${ util.responsiveStyles('margin-top', 120, 90, 70, 40) }
	${ util.responsiveStyles('margin-bottom', 120, 90, 70, 40) }
`

export const verticalSpacing = (attr = 'padding-top', multiple = 1) => `
	${ util.responsiveStyles(attr, (120 * multiple), (90 * multiple), (70 * multiple), (40 * multiple)) }
`

export const baseBorderRadius = 4

// Buttons, Inputs, Selects, etc.
export const uiElementSizes = {
	tiny: 32,
	small: 40,
	medium: 50,
	large: 60
}
