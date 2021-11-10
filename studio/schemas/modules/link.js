import React from 'react'
import { MdLink, MdOpenInNew } from 'react-icons/md'

export default {
  title: 'Link',
  name: 'link',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Link CTA',
      type: 'string'
    },
    {
      name: 'type',
      title: 'Link Type',
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
      name: 'newTab',
      title: 'Open in new tab',
      initialValue: false,
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      title: 'title',
      externalLink: 'externalLink',
      link: 'link'
    },
    prepare (selection) {
      const { link, externalLink } = selection
      return Object.assign({}, selection, {
        media: externalLink ? <MdOpenInNew size='24px' /> : <MdLink size='24px' />,
        subtitle: externalLink ? 'Link to ' + externalLink : 'Link to page'
      })
    }
  }
}
