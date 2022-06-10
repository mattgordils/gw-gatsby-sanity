import React from 'react'
import styled from '@emotion/styled'
import { GatsbyImage } from 'gatsby-plugin-image'

const StyledImage = styled(GatsbyImage)`
  ${ ({ ratio }) => ratio ? `
    > div:first-of-type {
      padding-top: ${ ratio * 100 }% !important;
    }
    img {
      display: block;
    }
  ` : '' }
	img {
    ${ ({ crop, hotspot }) => crop && hotspot ? `
    	object-position: ${ hotspot.x * 100 + '%' } ${ hotspot.y * 100 + '%' };
      width: ${ crop.left * 100 + crop.right * 100 + 100 }%;
      height: ${ crop.top * 100 + crop.bottom * 100 + 100 }%;
      left: ${ crop.left * -100 }%;
      right: ${ crop.right * -100 }%;
      top: ${ crop.top * -100 }%;
      bottom: ${ crop.bottom * -100 }%;
    ` : '' }
  }
`

const Image = ({ media, image, ratio, sizes, className, ...rest }) => (
	<StyledImage
		{...rest}
    className={className}
    image={image}
    ratio={ratio}
    sizes={sizes}
		crop={media?.crop}
		hotspot={media?.hotspot}
	/>
)

export default Image
