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
      subtitle: 'text.eyebrow'
    },
    prepare (selection) {
      const { media } = selection
      return Object.assign({}, selection, {
        title: 'Column',
        // subtitle: columns && columns.length + ' columns',
        media: media || FiAlignLeft
      })
    }
  }
}