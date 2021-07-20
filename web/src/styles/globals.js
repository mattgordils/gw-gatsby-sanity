import * as util from './util'

export const verticalSpacing = (attr = 'padding-top', multiple = 1) => `
	${ util.responsiveStyles(attr, (140 * multiple), (100 * multiple), (90 * multiple), (44 * multiple)) }
`

export const baseBorderRadius = 4

// Buttons, Inputs, Selects, etc.
export const uiElementSizes = {
	tiny: 32,
	small: 40,
	medium: 50,
	large: 60
}
