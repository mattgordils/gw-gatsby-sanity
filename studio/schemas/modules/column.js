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
      media: 'icon',
      subtitle: 'text.eyebrow',
      hidden: 'hidden'
    },
    prepare (selection) {
      const { media, hidden } = selection
      return Object.assign({}, selection, {
        title: 'Column',
        subtitle: columns && !hidden ? columns.length + ' columns' : (hidden && 'Hidden'),
        media: media || FiAlignLeft
      })
    }
  }
}