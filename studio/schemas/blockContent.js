import React from 'react'
import { MdLink, MdPlayArrow, MdCode, MdImage } from 'react-icons/md'
import { FaYoutube } from 'react-icons/fa'

const largeRender = props => (
  <span style={{ fontSize: '1.2em' }}>{props.children}</span>
)

const smallRender = props => (
  <span style={{ fontSize: '.8em' }}>{props.children}</span>
)

const imagePreview = ({ value }) => {
  const { image, caption } = value

  const projectId = process.env.SANITY_STUDIO_API_PROJECT_ID
  const dataset = process.env.SANITY_STUDIO_API_DATASET
  const ref = image.asset._ref
  const [_file, id, size, extension] = ref.split('-')
  const getUrlFromId = () => {
    // Example ref: file-207fd9951e759130053d37cf0a558ffe84ddd1c9-mp3
    // We don't need the first part, unless we're using the same function for files and images
    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${size}.${extension}`
  }
  const fileUrl = getUrlFromId()
  const fileName = id + '.' + extension

  if (!image) {
    return (
      <header style={{ padding: '1rem' }}>
        <h2 style={{
          fontSize: '16px',
          fontSize: '1rem',
          lineHeight: '1.25',
          padding: '4px 0',
          padding: '0.25rem 0',
          margin: '-2px 0 -1px',
          opacity: .5
        }}>There is no image yet.</h2>
      </header>
    )
  }

  return (
    <div>
      <header style={{ padding: '1rem', borderBottom: '1px solid rgb(93 113 145 / 25%)' }}>
        <h2 style={{
          fontSize: '16px',
          fontSize: '1rem',
          lineHeight: '1.25',
          padding: '4px 0',
          padding: '0.25rem 0',
          margin: '-2px 0 -1px',
        }}>{fileName}</h2>
      </header>
      <img src={fileUrl} style={{ display: 'block', width: '100%', height: 'auto' }}/>
      {caption && <p style={{ padding: '1rem0.25rem 0', margin: 0, fontSize: '.9em' }}>{caption}</p>}
    </div>
  )
}

export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Large', value: 'bodyLarge', blockEditor: { render: largeRender } },
        { title: 'Small', value: 'bodySmall', blockEditor: { render: smallRender } },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' }
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' }
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'link'
          }
        ]
      }
    },
    {
      name: 'inlineImage',
      title: 'Image',
      type: 'object',
      icon: MdImage,
      fields: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          name: 'caption',
          title: 'Caption (Optional)',
          type: 'string'
        }
      ],
      preview: {
        select: {
          image: 'image',
          caption: 'caption'
        },
        component: imagePreview,
      }
    },
    {
      type: 'video',
      title: 'Video',
      icon: MdPlayArrow
    },
    {
      type: 'youTube',
      title: 'YouTube',
      icon: FaYoutube
    },
    {
      type: 'descriptionList',
      title: 'Description List',
      // icon: FaYoutube
    },
    // Embed In Progress
    // {
    //   type: 'embed',
    //   title: 'Embed',
    //   icon: MdCode
    // },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
   
  ]
}
