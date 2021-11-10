import { MdLink, MdOpenInNew } from 'react-icons/md'

export default {
  title: 'Button',
  name: 'button',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Link CTA',
      type: 'string'
    },
    {
      name: 'type',
      title: 'Button Type',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'pageLink',
      options: {
        list: [
          { title: 'To Page', value: 'pageLink' },
          { title: 'External Link', value: 'externalLink' }
        ]
      }
    },
    {
      name: 'link',
      title: 'Link',
      type: 'reference',
      hidden: ({ parent }) => parent.type !== 'pageLink',
      to: [
        { type: 'page' }
      ]
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'string',
      hidden: ({ parent }) => parent.type !== 'externalLink',
      validation: Rule =>
        Rule.uri({
          allowRelative: true,
          scheme: ['https', 'http', 'mailto', 'tel']
        })
    },
    {
      name: 'theme',
      title: 'Theme',
      type: 'string',
      initialValue: 'primary',
      options: {
        list: ['primary', 'secondary']
      }
    },
    {
      name: 'newTab',
      title: 'Open in new tab',
      initialValue: false,
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'externalLink',
      link: 'link',
    },
    prepare (selection) {
      const { subtitle, link } = selection
      return Object.assign({}, selection, {
        media: subtitle ? MdOpenInNew : MdLink,
        subtitle: subtitle ? 'Button to ' + subtitle : 'Button to page'
      })
    }
  }
}
