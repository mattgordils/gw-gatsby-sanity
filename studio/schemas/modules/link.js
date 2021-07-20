import { MdLink, MdOpenInNew } from 'react-icons/md'

export default {
  title: 'Link',
  name: 'link',
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'title',
      title: 'Link CTA',
      type: 'string'
    },
    {
      name: 'link',
      title: 'Link',
      type: 'reference',
      to: [
        { type: 'page' },
        // { type: 'product' }
      ]
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'string',
      description: 'There is no `link` validation on this so please type accurate urls with https://, mailto:, tel: etc.'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'externalLink',
      link: 'link'
    },
    prepare (selection) {
      const { subtitle, link } = selection
      return Object.assign({}, selection, {
        media: subtitle ? MdOpenInNew : MdLink,
        subtitle: subtitle ? 'To ' + subtitle : 'To page'
      })
    }
  }
}
