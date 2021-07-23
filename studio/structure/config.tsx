import React from 'react'
import S from '@sanity/desk-tool/structure-builder'
import Emoji from 'a11y-react-emoji'

const ConfigIcon = () => <Emoji style={{ fontSize: '2rem' }} symbol='⚙️' />

export const ConfigMenu = S.listItem()
  .title('Settings')
  .icon(ConfigIcon)
  .child(
    S.list()
      .title('Settings')
      .items([
        // S.listItem()
        //   .title('Site Settings')
        //   .id('siteSettings')
        //   .child(
        //     S.documentTypeList('siteSettings')
        //       .title('Site Settings')
        //       .filter('_type == $type')
        //       .params({ type: 'siteSettings' })
        //   ),
        S.documentListItem('siteSettings')
          .title('Site Settings')
          .id('siteSettings')
          .schemaType('siteSettings'),
          // .filter('_type == $type')
          // .params({ type: 'siteSettings' }),
        S.listItem()
          .title('Menus')
          .child(
            S.documentTypeList('menus')
              .title('Menus')
              .filter('_type == $type')
              .params({ type: 'menus' })
          ),
        S.documentListItem()
          .title('Global')
          .id('siteGlobal')
          .schemaType('siteGlobal')
      ])
  )