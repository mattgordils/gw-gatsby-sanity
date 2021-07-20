import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Section from 'src/components/Section'
import Grid from 'src/components/Grid'
import { GatsbyImage } from 'gatsby-plugin-image'
import Video from 'src/components/Video'
import TextLockup from 'src/components/TextLockup'
import ScrollEntrance from 'src/components/ScrollEntrance'
import { mq } from 'src/styles'

const FFSection = styled(Section)``

const ColumnWrapper = styled.div`
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
    max-width: 40em;
  }
`

const arrangeMedia = {
  left: {
    normal: '2 [11] 2 [11] 2',
    large: '2 [12] 2 [10] 2',
    extraLarge: '2 [13] 2 [9] 2'
  },
  right: {
    normal: '2 [11] 2 [11] 2',
    large: '2 [12] 2 [10] 2',
    extraLarge: '2 [13] 2 [9] 2'
  },
  bleedLeft: {
    normal: '[13] 2 [11] 2',
    large: '[14] 2 [10] 2',
    extraLarge: '[15] 2 [9] 2'
  },
  bleedRight: {
    normal: '[13] 2 [11] 2',
    large: '[14] 2 [10] 2',
    extraLarge: '[15] 2 [9] 2'
  }
}

const mediaSizes = {
  noBleed: {
    normal: 100 / 28 * 11,
    large: 100 / 28 * 12,
    extraLarge: 100 / 28 * 13
  },
  bleed: {
    normal: 100 / 28 * 13,
    large: 100 / 28 * 14,
    extraLarge: 100 / 28 * 15
  }
}

const FiftyFifty = ({
  className,
  theme,
  prevTheme,
  nextTheme,
  media,
  mediaPlacement = 'left',
  mediaWidth = 'normal',
  eyebrow,
  text,
  actions,
  verticalAlignment = 'center',
  isFirstSection,
  listType
}) => {
  const image = media?.image?.asset
  const video = media?.video?.asset

  if (!image && !video) {
    return false
  }

  // set responsive image sizes
  let sizes = '100vw'
  let imageSize = mediaSizes.noBleed[mediaWidth]
  if (mediaPlacement.includes('bleed')) {
    imageSize = mediaSizes.bleed[mediaWidth]
  }
  sizes = '(min-width: ' + mq.mediumBreakpoint + 'px) ' + imageSize + 'vw, 86vw'

  console.log(actions)

  return (
    <FFSection
      className={className}
      setTheme={theme}
      prevTheme={prevTheme}
      nextTheme={nextTheme}
      isFirstSection={isFirstSection}
    >
      <Grid
        small="1 [12] 1"
        large={arrangeMedia[mediaPlacement || 'left'][mediaWidth || 'normal']}
        rowGap={['7vw', '7vw', '80px']}
        vAlign={verticalAlignment}
        gridDirection={mediaPlacement.includes('right') || mediaPlacement.includes('Right') ? 'rtl' : 'ltr'}
      >
        {media && (
          <ColumnWrapper>
            {media.mediaType === 'video' && (
              <ScrollEntrance>
                <Video src={video.url} />
              </ScrollEntrance>
            )}
            {media.mediaType === 'image' && (
              <ScrollEntrance>
                <GatsbyImage
                  image={image.gatsbyImageData}
                  loading={isFirstSection ? 'eager' : 'lazy'}
                  alt={image.altText || image.title}
                  sizes={sizes}
                  format={['auto', 'avif', 'webp']}
                />
              </ScrollEntrance>
            )}
          </ColumnWrapper>
        )}

        <ColumnWrapper>
          <TextLockup
            entranceDelay={1}
            eyebrow={eyebrow}
            text={text}
            actions={actions}
            theme={theme}
            listType={listType}
          />
        </ColumnWrapper>
      </Grid>
    </FFSection>
  )
}

FiftyFifty.defaultProps = {
  mediaWidth: 'normal',
  mediaPlacement: 'left'
}

FiftyFifty.propTypes = {
  /** One of the themes specified in `src/styles/themes.js` */
  theme: PropTypes.string,
  /** Can be an image or video from Contentful */
  media: PropTypes.string,
  /** Where should the media be placed? */
  mediaPlacement: PropTypes.oneOf(['left', 'right', 'bleedLeft', 'bleedRight']),
  /** How wide should the media be? */
  mediaWidth: PropTypes.oneOf(['normal', 'large', 'extraLarge']),
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
  verticalAlignment: PropTypes.oneOf(['bottom', 'top', 'center', 'baseline', 'stretch']),
  /** Should we adjust the space to accomidate the header? */
  isFirstSection: PropTypes.bool,
}

export default FiftyFifty
