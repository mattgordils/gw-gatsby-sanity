import React from 'react'
import TextSection from 'src/components/TextSection'
import WideMedia from 'src/components/WideMedia'
import FiftyFifty from 'src/components/FiftyFifty'
import Columns from 'src/components/Columns'
import TwoColumnText from 'src/components/TwoColumnText'
import { slugify } from 'src/utils/format'

const componentMap = {
  textSection: TextSection,
  wideMedia: WideMedia,
  fiftyFifty: FiftyFifty,
  columns: Columns,
  twoColumnText: TwoColumnText
}

const ComponentRenderer = ({ item, prevTheme, nextTheme, index, isLastSection, isFirstSection }) => {
  if (!item || !item?._type) {
    return false
  }
  const Component = componentMap[item._type]
  if (!Component) {
    return false
  }
  console.log(item)
  return Component ? (
      <Component
        {...item}
        prevTheme={prevTheme}
        nextTheme={nextTheme}
        id={slugify(item.internalName)}
        isLastSection={isLastSection}
        isFirstSection={isFirstSection}
        index={index}
      />
    ) : null
}

export default ComponentRenderer
