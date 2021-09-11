import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Section from 'src/components/Section'
import Grid from 'src/components/Grid'
import ScrollEntrance from 'src/components/ScrollEntrance'
import { GatsbyImage } from 'gatsby-plugin-image'
import TextLockup from 'src/components/TextLockup'
import { mq, globals } from 'src/styles'

const imageSizes = {
  large: {
    width: '100%',
    min: '100%',
    max: '100%'
  },
  medium: {
    width: '70%',
    min: '120px',
    max: '250px'
  },
  small: {
    width: '40%',
    min: '60px',
    max: '140px'
  }
}

const Wrapper = styled(Section)`
  text-align: ${ ({ alignment }) => alignment };
`

const IntroTextWrapper = styled(Grid)`
  ${ globals.verticalSpacing('padding-bottom', 0.5) }
`

const ColumnText = styled(TextLockup)`
  p {
    max-width: 28em;
  }
`

const MediaScrollEntrance = styled(ScrollEntrance)`
  display: inline-block;
  vertical-align: top;
  ${ ({ imageSize }) => imageSize
? `
    width: ${ imageSizes[imageSize].width };
    min-width: ${ imageSizes[imageSize].min };
    max-width: ${ imageSizes[imageSize].max };
  `
: `
    width: 100%;
  ` }
`

const ColumnWrapper = styled.div`
  .gatsby-image-wrapper,
  .video-wrapper {
    margin-bottom: 24px;
  }
`

const ColumnsGrid = styled.div`
  ${ ({ alignment, vAlign, smallCols, mediumCols, largeCols, colGap, rowGap }) => alignment === 'center'
? `
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: 0 !important;
    align-items: ${ vAlign === 'bottom' ? 'flex-end' : vAlign };
    margin-left: calc(${ colGap[0] } / -2);
    margin-right: calc(${ colGap[0] } / -2);
    margin-bottom: -${ rowGap[0] };
    width: auto;
    ${ mq.mediumAndUp } {
      margin-left: calc(${ colGap[1] } / -2);
      margin-right: calc(${ colGap[1] } / -2);
      margin-bottom: -${ rowGap[1] };
    }
    ${ mq.largeAndUp } {
      margin-left: calc(${ colGap } / -2);
      margin-right: calc(${ colGap } / -2);
      margin-bottom: -${ rowGap[2] };
    }
    ${ ColumnWrapper } {
      width: ${ 100 / smallCols }%;
      padding-left: calc(${ colGap[0] } / 2);
      padding-right: calc(${ colGap[0] } / 2);
      margin-bottom: ${ rowGap[0] };
      ${ mq.mediumAndUp } {
        width: ${ 100 / mediumCols }%;
        padding-left: calc(${ colGap[1] } / 2);
        padding-right: calc(${ colGap[1] } / 2);
        margin-bottom: ${ rowGap[1] };
      }
      ${ mq.largeAndUp } {
        width: ${ 100 / largeCols }%;
        padding-left: calc(${ colGap[2] } / 2);
        padding-right: calc(${ colGap[2] } / 2);
        margin-bottom: ${ rowGap[2] };
      }
    }
  `
: '' }
`

const gridSetup = {
  1: '[1]',
  2: '[1] [1]',
  3: '[1] [1] [1]',
  4: '[1] [1] [1] [1]',
  5: '[1] [1] [1] [1] [1]',
  6: '[1] [1] [1] [1] [1] [1]'
}

const Columns = ({
  className,
  theme,
  prevTheme,
  nextTheme,
  columns,
  alignment,
  verticalAlignment = 'top',
  id,
  introText,
  actions,
  desktopColumnCount,
  tabletColumnCount,
  mobileColumnCount,
  imageSize = 'small',
  paragraphSize
}) => {
  return (
    <Wrapper
      className={className}
      setTheme={theme}
      prevTheme={prevTheme}
      nextTheme={nextTheme}
      alignment={alignment === null ? 'left' : alignment}
    >
      <Grid small="container" medium="container" large="container" larger="container">
        <IntroTextWrapper small='[1]'>
          <TextLockup
            eyebrow={introText.eyebrow}
            text={introText._rawText}
          />
        </IntroTextWrapper>
        <ColumnsGrid
          small={gridSetup[mobileColumnCount] || gridSetup[1]}
          medium={gridSetup[tabletColumnCount] || gridSetup[2]}
          large={gridSetup[desktopColumnCount] || gridSetup[3]}
          smallCols={mobileColumnCount || 1}
          mediumCols={tabletColumnCount || 2}
          largeCols={desktopColumnCount || 3}
          vAlign={verticalAlignment}
          alignment={alignment}
          rowGap={['7vw', '7vw', '80px']}
          colGap={['2vw', '2vw', '2vw']}
          as={alignment === 'center' ? 'div' : Grid}
        >
          {columns.map((column, index) => {
            const sizes = '(min-width: ' + mq.mediumBreakpoint + 'px) ' + (86 / desktopColumnCount) + 'vw, (min-width: ' + mq.smallBreakpoint + 'px) ' + (86 / tabletColumnCount) + 'vw, ' + (86 / mobileColumnCount) + 'vw'
            return (
              <ColumnWrapper
                alignment={alignment === null ? 'left' : alignment}
                index={index}
                colCount={columns.length}
                key={column.id + '-' + index + '-' + id}
              >
                {column.icon && (
                  <MediaScrollEntrance delay={index} imageSize={imageSize || 'small'}>
                    <GatsbyImage image={column?.icon?.asset?.gatsbyImageData} alt={column?.icon?.altText || column?.text?.eyebrow || column?.icon?.originalFilename} sizes={sizes} format={['auto', 'avif', 'webp']}/>
                  </MediaScrollEntrance>
                )}
                <ColumnText
                  entranceDelay={column.media ? index + 1 : index}
                  eyebrow={column.text.eyebrow}
                  text={column.text._rawText}
                  textSize={paragraphSize}
                  theme={theme}
                  alignment={alignment}
                />
              </ColumnWrapper>
            )
          })}
        </ColumnsGrid>
      </Grid>
    </Wrapper>
  )
}

Columns.propTypes = {
  /** One of the themes specified in `src/styles/themes.js` */
  theme: PropTypes.string,
  /** Array of our content items model in Contentful */
  columns: PropTypes.shape([
    {
      media: PropTypes.string,
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
      ])
    }
  ]),
  /** What should the horizontal alignment be? (this effect text alignment as well) */
  alignment: PropTypes.oneOf(['left', 'center']),
  /** What should the vertical alignment be? */
  verticalAlignment: PropTypes.oneOf(['top', 'center', 'baseline', 'bottom']),
  /** How many columns should there be on desktop? */
  desktopColumnCount: PropTypes.number,
  /** How many columns should there be on tablet? */
  tabletColumnCount: PropTypes.number,
  /** How many columns should there be on mobile? */
  mobileColumnCount: PropTypes.number,
  /** What size should the image be? (ie: `small` is Good for icons) */
  imageSize: PropTypes.oneOf(['large', 'medium', 'small']),
  paragraphSize: PropTypes.oneOf(['body', 'bodyMedium', 'bodyLarge', 'bodySmall']),
}

export default Columns
