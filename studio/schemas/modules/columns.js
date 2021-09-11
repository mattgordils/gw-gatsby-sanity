import React from 'react'

import { MdViewWeek } from 'react-icons/md'
import SectionIcon from "../../components/SectionIcon";

export default {
  title: 'Columns',
  name: 'columns',
  type: 'object',
  fields: [
    {
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'introText',
      title: 'Intro Text',
      type: 'textLockup'
    },
    {
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [
        { type: 'column' }
      ]
    },
    {
      name: 'actions',
      title: 'Actions',
      type: 'array',
      of: [
        { type: 'button' },
        { type: 'link' }
      ]
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
      title: 'internalName',
      columns: 'columns'
    },
    prepare (selection) {
      const { columns } = selection
      return Object.assign({}, selection, {
        subtitle: columns && columns.length + ' columns',
        media: <SectionIcon><MdViewWeek size='24px'/></SectionIcon>
      })
    }
  }
}
