import { MdArtTrack, MdSlideshow } from 'react-icons/md'

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
        list: ['left', 'right', 'bleedLeft', 'bleedRight'],
        layout: 'dropdown',
      },
    },
    {
      name: 'mediaWidth',
      title: 'Media Width',
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
    }
  ],
  preview: {
    select: {
      subtitle: 'text.eyebrow',
      media: 'media'
    },
    prepare (selection) {
      const { title, subtitle, media } = selection
      return Object.assign({}, selection, {
        title: 'Fifty Fifty',
        subtitle: subtitle,
        media: media.mediaType === 'video' ? MdSlideshow : media.image
      })
    }
  }
}
