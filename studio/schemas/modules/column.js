import { FiAlignLeft } from 'react-icons/fi'

export default {
  name: 'column',
  title: 'Column',
  type: 'object',
  fields: [
    {
      name: 'icon',
      title: 'Icon',
      type: 'image'
    },
    {
      name: 'text',
      title: 'text',
      type: 'textLockup'
    }
  ],
  preview: {
    select: {
      media: 'icon',
      title: 'text.eyebrow',
    },
    prepare (selection) {
      const { media, title } = selection
      return Object.assign({}, selection, {
        title: title || 'Column',
        media: media || FiAlignLeft
      })
    }
  }
}