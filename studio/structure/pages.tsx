import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import Emoji from 'a11y-react-emoji'
import PreviewIFrame from '../src/components/previewIFrame'

const Icon = () => <Emoji style={{ fontSize: '2rem' }} symbol='📄' />

export const PageMenuItem = S.listItem()
  .title('Pages')
  .icon(Icon)
  .child(
    S.documentTypeList('page')
      .title('Pages')
      .menuItems(S.documentTypeList('page').getMenuItems())
      .filter('_type == $type')
      .params({ type: 'page' })
      .child(documentId =>
        S.document()
          .documentId(documentId)
          .views([S.view.form(), PreviewIFrame()])
        )
  );
