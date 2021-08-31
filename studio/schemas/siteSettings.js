import React from 'react'

import { MdSettings } from 'react-icons/md'
import SectionIcon from "../components/SectionIcon"

export default {
  name: 'siteSettings',
  _id: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // You probably want to uncomment the next line once you've made a siteSettings document in the Studio. This will remove the settings document type from the create-menus.
  __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string'
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image'
    },
    {
      name: 'touchicon',
      title: 'Touch Icon',
      type: 'image'
    },
    {
      name: 'social',
      title: 'Social',
      type: 'social'
    }
  ],
  preview: {
    select: {
      media: 'favicon'
    },
    prepare (selection) {
      return Object.assign({}, selection, {
        title: 'Site Settings',
        media: false
      })
    }
  }
}
