import React from 'react'
import S from '@sanity/desk-tool/structure-builder'
import resolveUrl from '../../resolvePreviewUrl'

const env = process.env.NODE_ENV || 'development'

const PreviewIFrame = () =>
  S.view
    .component(({document}) => {
      const {displayed} = document
      if (!displayed) {
        return <p>Nothing to display</p>
      }
      const url = resolveUrl(displayed)
      return (
        <React.Fragment>
          {
            env !== 'development' && <div style={{textAlign: 'center', fontSize: '14px', fontWeight: 700, padding: '8px 15px', background: 'repeating-linear-gradient(  45deg,  #E7C572,  #E7C572 10px,  #DBB043 10px,  #DBB043 20px)'}}>
              <p style={{ margin: 0 }}>This is your just a preview. Publish your changes to see them on the live site.</p>
            </div>
          }

          <iframe
            style={{
              width: '100%',
              height: 'calc(100% - 34px)'
            }}
            frameBorder={'0'}
            src={url}
          />
        </React.Fragment>
      )
    })
    .title('Web preview')

export default PreviewIFrame
