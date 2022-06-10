import React from 'react'
import { getGatsbyImageData } from 'gatsby-source-sanity'
import Image from 'src/components/Image'
import Video from 'src/components/Video'
import Link from 'src/components/Link'
import YoutubeVideo from 'src/components/Video/YoutubeVideo'
import EmbedCode from 'src/components/EmbedCode'
import { getSlugLink } from 'src/utils/format'

const sanityConfig = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET
}

const imageData = id => getGatsbyImageData(id, { maxWidth: 1024 }, sanityConfig)

const getClassName = (className, first, last) => {
  let classText = className
  if (first) {
    classText = classText + ' first-item'
  }
  if (last) {
    classText = classText + ' last-item'
  }
  return classText
}

export const Serializer = {
  types: {
    block (props) {
      switch (props.node.style) {
        case 'h1':
          return <h1 className={getClassName('h1', props.node.firstItem, props.node.lastItem)}>{props.children}</h1>

        case 'h2':
          return <h2 className={getClassName('h2', props.node.firstItem, props.node.lastItem)}>{props.children}</h2>

        case 'h3':
          return <h3 className={getClassName('h3', props.node.firstItem, props.node.lastItem)}>{props.children}</h3>

        case 'h4':
          return <h4 className={getClassName('h4', props.node.firstItem, props.node.lastItem)}>{props.children}</h4>

        case 'h5':
          return <h5 className={getClassName('h5', props.node.firstItem, props.node.lastItem)}>{props.children}</h5>

        case 'li':
          return <li>{props.children}</li>

        case 'blockquote':
          return <blockquote className={getClassName('', props.node.firstItem, props.node.lastItem)}>{props.children}</blockquote>

        case 'bodyLarge':
          if (props.listItem) return <strong>{props.children}</strong>
          else return <p className={getClassName('large', props.node.firstItem, props.node.lastItem)}>{props.children}</p>

        case 'bodyMedium':
          if (props.listItem) return <strong>{props.children}</strong>
          else return <p className={getClassName('medium', props.node.firstItem, props.node.lastItem)}>{props.children}</p>

        case 'bodySmall':
          if (props.listItem) return <strong>{props.children}</strong>
          else return <p className={getClassName('small', props.node.firstItem, props.node.lastItem)}>{props.children}</p>

        case 'normal':
          if (props.listItem) return <strong>{props.children}</strong>
          else return <p className={getClassName('', props.node.firstItem, props.node.lastItem)}>{props.children}</p>
        default:
          return <p className={getClassName('', props.node.firstItem, props.node.lastItem)}>{props.children}</p>
      }
    },
    inlineImage: ({ node }) => {
      if (!node?.image?.asset?.id) {
        return false
      }
      return (
        <div className={getClassName('embeded-content', node.firstItem, node.lastItem)}>
          <Image image={imageData(node.image.asset.id)}/>
          {node.caption && <figcaption style={{ paddingTop: '.75em' }}>{node.caption}</figcaption>}
        </div>
      )
    },
    video: ({ node }) => {
      if (!node?.video?.asset?.url) {
        return false
      }
      return <div className={getClassName('embeded-content', node.firstItem, node.lastItem)}><Video src={node?.video?.asset?.url}/></div>
    },
    youTube: ({ node }) => {
      return <div className={getClassName('embeded-content', node.firstItem, node.lastItem)}><YoutubeVideo src={node.url}/></div>
    },
    descriptionList: ({ node }) => {
      if (!node?.listItems || node?.listItems.length === 0) {
        return false
      }
      return <div className={getClassName('description-list', node.firstItem, node.lastItem)}>
        <dl>
          {node.listItems.map(item => (
            <li key={item._key}>
              <dt>{item.title}</dt>
              <dd>{item.text}</dd>
            </li>
          ))}
        </dl>
      </div>
    },
    embed: ({ node }) => {
      // TODO
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
      <strong>{props.children}</strong>
    ),
    code: props => (
      <code>{props.children}</code>
    ),
    link: props => {
      const action = props.mark
      return (
        <Link
          to={action.type === 'externalLink' ? action.externalLink : getSlugLink(action.link, false, action.linkSection)}
          external={action.type === 'externalLink'}
          target={action.newTab ? '_blank' : ''}
          title={action.title}
          name={action.title}
        >{props.children}</Link>
      )
    }
  },
  list: props => {
    const { type } = props
    const bullet = type === 'bullet'
    if (bullet) {
      return <ul>{props.children}</ul>
    }
    return <ol>{props.children}</ol>
  },
  listItem: props => <li><p>{props.children}</p></li>
}
