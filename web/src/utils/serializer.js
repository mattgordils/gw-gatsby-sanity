import React from 'react'
import { getGatsbyImageData } from 'gatsby-source-sanity'
import Image from 'src/components/Image'
import Video from 'src/components/Video'
import YoutubeVideo from 'src/components/Video/YoutubeVideo'
import EmbedCode from 'src/components/EmbedCode'

const sanityConfig = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET
}

const imageData = id => getGatsbyImageData(id, { maxWidth: 1024 }, sanityConfig)

export const Serializer = {
  types: {
    block (props) {
      switch (props.node.style) {
        case 'h1':
          return <h1 className="">{props.children}</h1>

        case 'h2':
          return <h2 className="">{props.children}</h2>

        case 'h3':
          return <h3 className="">{props.children}</h3>

        case 'h4':
          return <h4 className="">{props.children}</h4>

        case 'h5':
          return <h5 className="">{props.children}</h5>

        case 'li':
          return <li>{props.children}</li>

        case 'blockquote':
          return <blockquote className="">{props.children}</blockquote>

        case 'bodyLarge':
          if (props.listItem) return <strong>{props.children}</strong>
          else return <p className='large'>{props.children}</p>

        case 'bodySmall':
          if (props.listItem) return <strong>{props.children}</strong>
          else return <p className='small'>{props.children}</p>

        case 'normal':
          if (props.listItem) return <strong>{props.children}</strong>
          else return <p>{props.children}</p>
        default:
          return <p>{props.children}</p>
      }
    },
    image: ({ node }) => {
      return <div className='embeded-content'><Image image={imageData(node.asset.id)}/></div>
    },
    video: ({ node }) => {
      return <div className='embeded-content'><Video src={node.asset.url}/></div>
    },
    youTube: ({ node }) => {
      return <div className='embeded-content'><YoutubeVideo src={node.url}/></div>
    },
    embed: ({ node }) => {
      console.log('TBD')
      return <p><EmbedCode embedCode={node.embedCode} /></p>
    },
  },
  marks: {
    tick: props => (
      <span className='tick'>{props.children}</span>
    ),
    italic: props => (
      <em>{props.children}</em>
    ),
    strong: props => (
      <span>{props.children}</span>
    ),
    code: props => (
      <pre>{props.children}</pre>
    )
  },
  list: props => {
    const { type } = props
    const bullet = type === 'bullet'
    if (bullet) {
      return <ul>{props.children}</ul>
    }
    return <ol>{props.children}</ol>
  },
  listItem: props => <li>{props.children}</li>
}
