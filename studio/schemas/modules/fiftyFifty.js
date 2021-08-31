import React from 'react'

import { MdArtTrack, MdSlideshow } from 'react-icons/md'
import SectionIcon from "../../components/SectionIcon"

export default {
  title: 'Fifty Fifty',
  name: 'fiftyFifty',
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'theme',
      title: 'Theme',
      type: 'theme'
    },
    {
      name: 'media',
      title: 'Media',
      type: 'media',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'textLockup'
    },
    {
      name: 'actions',
      title: 'Actions',
      type: 'actions'
    },
    {
      name: 'mediaPlacement',
      title: 'Media Placement',
      type: 'string',
      initialValue: 'left',
      options: {
        list: ['left', 'right'],
        layout: 'dropdown',
      },
    },
    {
      name: 'width',
      title: 'Section Width',
      type: 'string',
      initialValue: 'default',
      options: {
        list: ['default', 'fullWidth'],
        layout: 'dropdown',
      },
    },
    {
      name: 'mediaWidth',
      title: 'Media Size',
      type: 'string',
      initialValue: 'normal',
      options: {
        list: ['normal', 'large', 'extraLarge'],
        layout: 'dropdown',
      },
    },
    {
      name: 'verticalAlignment',
      title: 'Vertical Alignment',
      type: 'string',
      initialValue: 'center',
      options: {
        list: ['center', 'top', 'bottom']
      },
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
      subtitle: 'text.eyebrow',
      media: 'media',
      hidden: 'hidden'
    },
    prepare (selection) {
      const { title, subtitle, media, hidden } = selection
      return Object.assign({}, selection, {
        title: 'Fifty Fifty',
        subtitle: hidden ? 'Hidden' : subtitle,
        media: media.mediaType === 'video' ? <SectionIcon hidden={hidden}><MdSlideshow size='24px'/></SectionIcon> : media.image
      })
    }
  }
}
