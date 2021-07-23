import React from 'react'

import { MdSlideshow } from 'react-icons/md'
import SectionIcon from "../../components/SectionIcon";

export default {
  title: 'Wide Media',
  name: 'wideMedia',
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'media',
      title: 'Media',
      type: 'media',
      validation: Rule => Rule.required()
    },
    {
      name: 'text',
      title: 'Text',
      type: 'textLockup',
    },
    {
      name: 'actions',
      title: 'Actions',
      type: 'actions'
    },
    {
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      initialValue: 'center',
      options: {
        list: ['left', 'center']
      }
    },
    {
      name: 'overlayPlacementVertical',
      title: 'Vertical Placement',
      type: 'string',
      initialValue: 'center',
      options: {
        list: ['center', 'top', 'bottom']
      }
    },
    {
      name: 'overlayPlacementHorizontal',
      title: 'Horizontal Placement',
      type: 'string',
      initialValue: 'left',
      options: {
        list: ['left', 'center', 'right']
      }
    },
    {
      name: 'height',
      title: 'Height',
      type: 'string',
      initialValue: 'auto',
      options: {
        list: [
          { title: 'auto', value: 'auto' },
          { title: 'Full Height', value: 'fullHeight' },
          { title: 'Medium Height', value: 'mediumHeight' },
          { title: 'Short Height', value: 'shortHeight' }
        ],
        layout: 'dropdown'
      }
    },
    {
      name: 'width',
      title: 'Width',
      type: 'string',
      initialValue: 'full',
      options: {
        list: [
          {title: 'Full Width', value: 'fullWidth'},
          {title: 'Margins', value: 'Margins'}
        ],
        layout: 'dropdown',
      }
    }
  ],
  preview: {
    select: {
      subtitle: 'width',
      media: 'media'
    },
    prepare (selection) {
      const { title, subtitle, media } = selection
      return Object.assign({}, selection, {
        title: 'Wide Media',
        subtitle: subtitle,
        media: media.mediaType === 'video' ? <SectionIcon><MdSlideshow/></SectionIcon> : media.image
      })
    }
  }
}
