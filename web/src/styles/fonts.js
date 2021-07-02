import MaterialIconsWoff from '../assets/fonts/icons/material-icons-regular.woff'
import MaterialIconsWoff2 from '../assets/fonts/icons/material-icons-regular.woff2'

import DmSansWoff from '../assets/fonts/dm-sans/DMSans-Regular.woff'
import DmSansWoff2 from '../assets/fonts/dm-sans/DMSans-Regular.woff2'

import DmSansItalicWoff from '../assets/fonts/dm-sans/DMSans-Italic.woff'
import DmSansItalicWoff2 from '../assets/fonts/dm-sans/DMSans-Italic.woff2'

import DmSansBoldWoff from '../assets/fonts/dm-sans/DMSans-Bold.woff'
import DmSansBoldWoff2 from '../assets/fonts/dm-sans/DMSans-Bold.woff2'

import DmSansBoldItalicWoff from '../assets/fonts/dm-sans/DMSans-BoldItalic.woff'
import DmSansBoldItalicWoff2 from '../assets/fonts/dm-sans/DMSans-BoldItalic.woff2'

export const fontFace = (fontName, woff, woff2, fontWeight = 'normal', fontStyle = 'normal') => `
	@font-face {
		font-family: '${ fontName }';
		src:  url('${ woff }') format('woff'),
					url('${ woff2 }') format('woff2');
		font-weight: ${ fontWeight };
		font-style: ${ fontStyle };
		font-display: swap;
	}
`
export const MaterialIcons = 'Material Icons'
export const MaterialIconsFont = fontFace(MaterialIcons, MaterialIconsWoff, MaterialIconsWoff2)

export const DmSans = 'DM Sans'
export const DmSansFont = fontFace(DmSans, DmSansWoff, DmSansWoff2)
export const DmSansItalicFont = fontFace(DmSans, DmSansItalicWoff, DmSansItalicWoff2, 'normal', 'italic')
export const DmSansBoldFont = fontFace(DmSans, DmSansBoldWoff, DmSansBoldWoff2, '600')
export const DmSansBoldItalicFont = fontFace(DmSans, DmSansBoldItalicWoff, DmSansBoldItalicWoff2, '600', 'italic')
