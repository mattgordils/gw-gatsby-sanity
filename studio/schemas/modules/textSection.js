import React from 'react'

import { FiAlignCenter, FiAlignLeft } from "react-icons/fi"
import SectionIcon from "../../components/SectionIcon"

export default {
  title: "Text Section",
  name: "textSection",
  type: "object",
  fields: [
    {
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: "text",
      title: "Text",
      type: "textLockup",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "actions",
      title: "Actions",
      type: "actions",
    },
    {
      name: "alignment",
      title: "Alignment",
      type: "string",
      initialValue: "center",
      options: {
        list: ["left", "center"],
      },
    },
    {
      name: "theme",
      title: "Theme",
      type: "theme",
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
      title: 'internalName',
      subtitle: "text.eyebrow",
      alignment: "alignment",
      hidden: "hidden"
    },
    prepare(selection) {
      const { alignment, subtitle, hidden } = selection;
      return Object.assign({}, selection, {
        subtitle: hidden ? 'Hidden' : subtitle,
        media: alignment === "left" ? <SectionIcon hidden={hidden}><FiAlignLeft size='24px'/></SectionIcon> : <SectionIcon hidden={hidden}><FiAlignCenter size='24px'/></SectionIcon>,
      });
    },
  },
};
