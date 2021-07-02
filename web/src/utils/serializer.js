import React from 'react'

export const Serializer = {
  marks: {
    tick: (props) => (
      <span className='tick'>{props.children}</span>
    ),
    italic: (props) => (
      <em>{props.children}</em>
    ),
    code: (props) => (
      <pre>{props.children}</pre>
    )
  }
}
