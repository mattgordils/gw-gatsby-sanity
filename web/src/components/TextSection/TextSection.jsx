import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Section from 'src/components/Section'
import TextLockup from 'src/components/TextLockup'
import Grid from 'src/components/Grid'

const Wrapper = styled(Section)`
  ${ ({ alignment }) => alignment !== 'right' && `
    text-align: ${ alignment };
  ` }
  h1, h2, h3, h4, h5, h6, p {
    ${ ({ alignment }) => alignment === 'center' && `
      margin-left: auto;
      margin-right: auto;
    ` }
  }
  h1, h2, h3 {
    max-width: 20em;
  }
  h4, h4 {
    max-width: 26em;
  }
  h6 {
    max-width: 16em;
  }
  p {
    max-width: 36em;
  }
`

const TextSection = ({
  className,
  nextTheme,
  prevTheme,
  theme,
  text,
  actions,
  alignment = 'center',
  isFirstSection,
  id
}) => {
  // console.log(text)
  if (!text && !text.eyebrow && !actions) {
    return false
  }
  const align = {
    // same as in WideMedia.jsx
    left: {
      medium: 'container',
      large: 'container',
      larger: 'container'
    },
    center: {
      medium: 'container',
      large: 'container',
      larger: 'container'
    },
    right: {
      medium: '7 [6] 1',
      large: '7 [6] 1',
      larger: '7 [5] 2'
    }
  }

  if (!alignment || alignment === null) {
    alignment = 'left'
  }

  return (
    <Wrapper
      className={className}
      prevTheme={prevTheme}
      setTheme={theme}
      nextTheme={nextTheme}
      alignment={alignment}
      isFirstSection={isFirstSection}
    >
      <Grid
        small="1 [12] 1"
        medium={align[alignment].medium}
        large={align[alignment].large}
        larger={align[alignment].larger}
      >
        <TextLockup
          eyebrow={text.eyebrow}
          text={text}
          // textSize={paragraphSize}
          actions={actions}
          theme={theme}
        />
      </Grid>
    </Wrapper>
  )
}

TextSection.propTypes = {
  /** One of the themes specified in `src/styles/themes.js` */
  theme: PropTypes.string,
  paragraphSize: PropTypes.oneOf(['body', 'bodyMedium', 'bodyLarge', 'bodySmall']),
  /** Text above the headline */
  eyebrow: PropTypes.string,
  /** `raw` rich text from Contentful */
  text: PropTypes.shape({ raw: PropTypes.string }),
  /** Buttons or links to go under text */
  actions: PropTypes.shape([
    {
      __typename: PropTypes.oneOf(['ContentfulButton', 'ContentfulLink']),
      to: PropTypes.string,
      linkToPage: PropTypes.shape({ slug: PropTypes.string }),
      openInNewTab: PropTypes.bool,
      label: PropTypes.string
    }
  ]),
  alignment: PropTypes.oneOf(['center', 'left', 'right']),
  /** Should we adjust the space to accomidate the header? */
  isFirstSection: PropTypes.bool,
}

export default TextSection
