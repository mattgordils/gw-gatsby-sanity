import { FiAlignCenter, FiAlignLeft } from 'react-icons/fi'

export default {
  title: 'Text Section',
  name: 'textSection',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: 'textLockup',
      validation: (Rule) => Rule.required(),
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
      name: 'theme',
      title: 'Theme',
      type: 'theme'
    }
  ],
  preview: {
    select: {
      subtitle: 'text.eyebrow',
      alignment: 'alignment'
    },
    prepare (selection) {
      const { alignment } = selection
      return Object.assign({}, selection, {
        title: 'Text Section',
        media: alignment === 'left' ? FiAlignLeft : FiAlignCenter
      })
    }
  }
}
