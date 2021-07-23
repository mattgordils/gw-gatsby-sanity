import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Section from 'src/components/Section'
import { GatsbyImage } from 'gatsby-plugin-image'
import Video from 'src/components/Video'
import Grid from 'src/components/Grid'
import { colors, animations } from 'src/styles'
import TextLockup from 'src/components/TextLockup'
// import ResponsiveComponent from 'src/components/ResponsiveComponent'
import { headerHeight } from 'src/components/Header'
import { use100vh } from 'react-div-100vh'

const Wrapper = styled(Section)`
  position: relative;
  ${ ({ overlayTextColor }) => overlayTextColor === 'dark' ? `
    color: ${ colors.textColor };
  ` : `
    color: ${ colors.bgColor };
  ` }
`

const WideMediaWrap = styled.div`
  ${ ({ height }) => height !== 'auto' && `
    position: relative;
    z-index: 2;
  ` }
`

const ContentWrap = styled.div`
  position: relative;
`

const MediaItem = styled.div`
  z-index: 1;
  width: 100%;
  overflow: hidden;
  ${ ({ isFirstSection }) => isFirstSection ? css`
    opacity: 0;
    will-change: opacity;
    transform: translateZ(0);
    animation: ${ animations.fadeIn } ${ animations.mediumSpeed } .1s ease-in-out forwards;
  ` : `` }
  ${ ({ overlay, height }) => (overlay && height !== 'auto') ? `
    position: absolute !important;
    top: 0;
    left: 0;
    height: 100%;
  ` : `
    position: relative;
  ` }
  ${ ({ height }) => height !== 'auto' ? `
    height: 100%;
    min-height: ${ height };
    > div, 
    > div > div {
      height: 100% !important;
      min-height: ${ height };
      position: relative;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      width: 100%;
      height: 100%;
      min-height: ${ height };
    }
    video {
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      width: 100%;
      height: 100%;
      min-height: ${ height };
    }
  ` : `
    height: 100%;
  ` }
`

const OverlayContent = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  display: flex;
  flex-direction: column;
  ${ ({ height }) => height === 'auto' ? `
    position: absolute;
  ` : `
    position: relative;
  ` }
  ${ ({ height }) => height !== 'auto' && `
    min-height: ${ height };
  ` }
  justify-content: ${ ({ verticalPlacement }) => {
    if (!verticalPlacement) return 'center'
    if (verticalPlacement === 'top') return 'flex-start'
    if (verticalPlacement === 'bottom') return 'flex-end'
    else return verticalPlacement
  } };
  text-align: ${ ({ overlayTextAlignment }) => overlayTextAlignment || 'left' };
  h1, h2, h3 {
    max-width: 10em;
  }
  h4, h4 {
    max-width: 12em;
  }
  h6 {
    max-width: 16em;
  }
  p {
    max-width: 36em;
  }
`

const OverlaySection = styled(Section)`
  position: relative;
  ${ ({ isFirstSection }) => isFirstSection && `
    ${ headerHeight('padding-top') }
  ` }
`

function getHorizontalPlacementGridValues ({ fullWidth, horizontalPlacement }) {
  if (!fullWidth) {
    return {
      left: {
        medium: '2 [10] 2',
        large: '2 [8] 4',
        larger: '2 [6] 6'
      },
      center: {
        medium: '2 [10] 2',
        large: '3 [8] 3',
        larger: '4 [6] 4'
      },
      right: {
        medium: '7 [5] 2',
        large: '7 [5] 2',
        larger: '7 [5] 2'
      }
    }[horizontalPlacement]
  } else {
    return {
      left: {
        medium: '1 [12] 1',
        large: '1 [12] 1',
        larger: '1 [12] 1'
      },
      center: {
        medium: '2 [10] 2',
        large: '2 [10] 2',
        larger: '2 [10] 2'
      },
      right: {
        medium: '7 [6] 1',
        large: '7 [6] 1',
        larger: '7 [6] 1'
      }
    }[horizontalPlacement]
  }
}

const WideMedia = ({
  media,
  mediaMedium,
  mediaSmall,
  width,
  theme,
  prevTheme,
  nextTheme,
  height,
  text,
  paragraphSize,
  actions,
  overlayPlacementVertical,
  overlayPlacementHorizontal,
  alignment,
  isFirstSection,
  overlayTextColor
}) => {
  const winHeight = use100vh()
  if (!media) {
    return false
  }

  if (!height) {
    height = 'auto'
  }

  const fullWidth = width === 'fullWidth'

  const getMediaType = type => {
    return type.includes('video') ? 'video' : 'image'
  }

  const fullHeight = !isFirstSection ? winHeight : false
  // const fullHeight = false

  const heightValues = {
    auto: 'auto',
    fullHeight: (fullHeight && isFirstSection) ? fullHeight + 'px' : '100vh',
    mediumHeight: '70vh',
    shortHeight: '50vh'
  }

  const overlayGridSettings = getHorizontalPlacementGridValues({ fullWidth, overlayPlacementHorizontal })
  const hasOverlay = text.text || actions

  const renderMedia = (mediaItem, size, hasOverlay, autoHeight) => {
    // if (size === 'small' && !mediaItem) {
    //   mediaItem = mediaMedium || media
    // } else if (size === 'medium' && !mediaItem) {
    //   mediaItem = media
    // }
    // console.log(mediaItem)
    if (mediaItem) {
      const contentType = mediaItem.mediaType || 'image'
      if (contentType === 'video') {
        const media = mediaItem.video.asset
        return <MediaItem
          overlay={hasOverlay}
          src={media.url}
          playing={true}
          isFirstSection={isFirstSection}
          loop={true}
          height={heightValues[height]}
          posterImage={mediaItem.posterImage}
          autoplay={true}
          as={Video}
          overlayTextColor={overlayTextColor}
        />
      } else {
        const media = mediaItem.image.asset
        return <MediaItem
          overlay={hasOverlay}
          image={media.gatsbyImageData}
          loading={isFirstSection ? 'eager' : 'lazy'}
          isFirstSection={isFirstSection}
          height={heightValues[height]}
          alt={text?.eyebrow || media.originalFilename}
          as={GatsbyImage}
          format={['auto', 'avif', 'webp']}
          overlayTextColor={overlayTextColor}
        />
      }
    }
    return false
  }

  return (
    <Wrapper
      nextTheme={nextTheme}
      prevTheme={prevTheme}
      setTheme={theme}
      padded={!fullWidth}
      overlayTextColor={overlayTextColor}
    >
      <WideMediaWrap height={heightValues[height]} overlayTextColor={overlayTextColor}>
        <Grid small={fullWidth ? '[1]' : 'container'} medium={fullWidth ? '[1]' : 'container'} large={fullWidth ? '[1]' : 'container'}>
          <ContentWrap>
            {/*<ResponsiveComponent
              small={renderMedia(mediaSmall, 'small', hasOverlay, height === 'auto')}
              medium={renderMedia(mediaMedium, 'medium', hasOverlay, height === 'auto')}
              large={renderMedia(media, 'large', hasOverlay, height === 'auto')}
            />*/}

            {renderMedia(media, 'large', hasOverlay, height === 'auto')}
            {hasOverlay && (
              <OverlayContent
                padded={!fullWidth}
                overlayTextAlignment={alignment}
                verticalPlacement={overlayPlacementVertical}
                height={heightValues[height]}
              >
                <OverlaySection isFirstSection={isFirstSection}>
                  <Grid
                    small='container'
                    medium='container'
                    large='container'
                    {...overlayGridSettings}
                  >
                    <TextLockup
                      text={text}
                      textSize={paragraphSize}
                      actions={actions}
                      alignment={alignment}
                      transitionIn={!isFirstSection}
                    />
                  </Grid>
                </OverlaySection>
              </OverlayContent>
            )}
          </ContentWrap>
        </Grid>
      </WideMediaWrap>
    </Wrapper>
  )
}

WideMedia.propTypes = {
  /**
   * What color should the text be?
   */
  overlayTextColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  width: PropTypes.oneOf(['fullWidth', 'margins']),
}

WideMedia.defaultProps = {
  width: 'margins',
  height: 'auto',
  overlayTextColor: 'light'
}

WideMedia.propTypes = {
  /** Can be an image or video from Contentful */
  media: PropTypes.string,
  /** Contentful image or video for tablet screen size */
  mediaMedium: PropTypes.string,
  /** Contentful image or video for mobile screen size */
  mediaSmall: PropTypes.string,
  /** Should the image have space around it our extend the full width of the window? */
  width: PropTypes.oneOf(['margins', 'fullWidth']),
  /** One of the themes specified in `src/styles/themes.js` */
  theme: PropTypes.string,
  /** How tall should the section be? */
  height: PropTypes.oneOf([
    'auto',
    'fullHeight',
    'mediumHeight',
    'shortHeight'
  ]),
  /** Text above the headline */
  eyebrow: PropTypes.string,
  /** `raw` rich text from Contentful */
  text: PropTypes.shape({ raw: PropTypes.string }),
  paragraphSize: PropTypes.oneOf(['body', 'bodyMedium', 'bodyLarge', 'bodySmall']),
  actions: PropTypes.shape([
    {
      __typename: PropTypes.oneOf(['ContentfulButton', 'ContentfulLink']),
      to: PropTypes.string,
      linkToPage: PropTypes.shape({ slug: PropTypes.string }),
      openInNewTab: PropTypes.bool,
      label: PropTypes.string
    }
  ]),
  /** What position should the overlay text be in? */
  overlayPlacement: PropTypes.oneOf([
    'top left',
    'top center',
    'top right',
    'center left',
    'center center',
    'center right',
    'bottom left',
    'bottom center',
    'bottom right',
  ]),
  /** What is the text alignment of the overlay text? */
  overlayTextAlignment: PropTypes.oneOf(['left', 'center', 'right']),
  /** Should we adjust the space to accomidate the header? */
  isFirstSection: PropTypes.bool,
  overlayTextColor: PropTypes.oneOf(['light', 'dark']),
}

export default WideMedia
