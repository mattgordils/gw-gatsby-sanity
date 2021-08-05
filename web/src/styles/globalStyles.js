import * as typography from './typography'
import * as colors from './colors'
import * as animations from './animations'
import * as util from './util'
import * as fonts from './fonts'
import { slick } from './slick'
import { rgba } from 'polished'

const responsiveStyles = util.responsiveStyles

// All global styles
const globalStyles = `
  ${ fonts.MaterialIconsFont }
  ${ fonts.DmSansFont }
  ${ fonts.DmSansItalicFont }
  ${ fonts.DmSansBoldFont }
  ${ fonts.DmSansBoldItalicFont }

  * {
    box-sizing: border-box;
  }

  html {
    font-display: block;
    background: ${ colors.bgColor };
    color: ${ colors.textColor };
    ${ util.fontSmoothing }
    -webkit-text-size-adjust: none;
    text-size-adjust: none;
    padding: 0;
    margin: 0;
    background-attachment: fixed;
    &.page-lock {
      position: relative;
      overflow: hidden;
      height: 100%;
    }
  }

  body {
    ${ typography.body }
    color: ${ colors.textColor };
    background: ${ colors.bgColor };
    padding: 0;
    margin: 0;
  }

  b, strong {
    font-weight: ${ typography.bold };
  }

  em, i {
    font-style: italic;
  }

  h1, h2, h3, h4, h5, h6, blockquote, p, ul, ol {
    font-weight: normal;
    margin: 0 0 0.5em;
  }

  h1, h2, h3, h4, h5, h6, blockquote {
    b, strong {
      font-weight: ${ typography.bold };
    }
  }

  p {
    ${ typography.body }
    margin-top: 1em;
    margin-bottom: 1em;
    &.small {
      ${ typography.bodySmall }
    }
    &.medium {
      ${ typography.bodyMedium }
    }
    &.large {
      ${ typography.bodyLarge }
    }
    a {
      border-bottom: 1px solid ${ colors.hrColor };
      padding-bottom: .1em;
      &:hover {
        border-color: ${ colors.mainColor };
      }
    }
  }

  h1, .h1 {
    ${ typography.h1 }
    ${ responsiveStyles('margin-top', 10, 10, 10, 8) }
    ${ responsiveStyles('margin-bottom', 12, 10, 8, 8) }
  }

  h2, .h2 {
    ${ typography.h2 }
    ${ responsiveStyles('margin-top', 10, 10, 10, 8) }
    ${ responsiveStyles('margin-bottom', 10, 10, 8, 8) }
  }

  h3, .h3 {
    ${ typography.h3 }
    ${ responsiveStyles('margin-top', 10, 10, 10, 8) }
    ${ responsiveStyles('margin-bottom', 14, 12, 12, 10) }
  }

  h4, .h4 {
    ${ typography.h4 }
    ${ responsiveStyles('margin-top', 24, 16, 16, 8) }
    ${ responsiveStyles('margin-bottom', 14, 12, 12, 10) }
  }

  h5, .h5 {
    ${ typography.h5 }
    ${ responsiveStyles('margin-top', 24, 16, 16, 8) }
    margin-bottom: 0;
  }

  h6, .h6 {
    ${ typography.h6 }
    margin-top: 0;
    ${ responsiveStyles('margin-bottom', 24, 16, 16, 8) }
  }

  figcaption {
    ${ typography.bodySmall }
    color: ${ colors.lightTextColor };
  }

  hr {
    margin: 2em auto;
    border: 0;
    display: block;
    border-bottom: 1px solid ${ colors.hrColor };
  }

  a {
    color: inherit;
    cursor: pointer;
    text-decoration: none;
    transition:   color ${ animations.mediumSpeed } ease-in-out,
                  border ${ animations.mediumSpeed } ease-in-out,
                  background ${ animations.mediumSpeed } ease-in-out,
                  opacity ${ animations.mediumSpeed } ease-in-out,
                  transform ${ animations.mediumSpeed } ease-in-out;
    &.text-link {
      font-size: 14px;
      line-height: 16px;
      font-weight: bold;
      text-decoration: none;
      letter-spacing: 1.75px;
      border-bottom: 1px solid ${ colors.mainColor };
      text-transform: uppercase;
      color: ${ colors.mainColor };
      padding-bottom: 3px;
    }
  }

  // Remove grey rectangle from iOS taps
  a, input, button {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  ul, ol {
    padding-left: 2em;
    p {
      margin: 0;
    }
  }

  blockquote {
    ${ typography.blockquote };
  }

  img {
    max-width: 100%;
    height: auto;
    vertical-align: top;
  }

  time {
    ${ typography.bodySmall };
  }

  ::selection {
    background: ${ rgba(colors.mainColor, 0.9) };
    color: ${ colors.bgColor };
  }
  
  ${ slick }

`
 export default globalStyles