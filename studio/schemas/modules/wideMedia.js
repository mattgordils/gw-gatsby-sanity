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
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
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
      initialValue: 'fullWidth',
      options: {
        list: [
          {title: 'Full Width', value: 'fullWidth'},
          {title: 'Margins', value: 'margins'}
        ],
        layout: 'dropdown',
      }
    },
    {
      name: "hidden",
      title: "Hidden",
      initialValue: false,
      type: "boolean",
    },
  ],
  preview: {
    select: {
      title: 'internalName',
      subtitle: 'width',
      media: 'media',
      hidden: 'hidden'
    },
    prepare (selection) {
      const { title, subtitle, media, hidden } = selection
      return Object.assign({}, selection, {
        subtitle: hidden ? 'Hidden' : subtitle,
        media: media.mediaType === 'video' ? <SectionIcon hidden={hidden}><MdSlideshow size='24px'/></SectionIcon> : media.image
      })
    }
  }
}
