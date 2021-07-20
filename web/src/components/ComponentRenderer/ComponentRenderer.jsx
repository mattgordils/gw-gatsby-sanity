import React from 'react'
import TextSection from 'src/components/TextSection'
import WideMedia from 'src/components/WideMedia'
import FiftyFifty from 'src/components/FiftyFifty'
import Columns from 'src/components/Columns'

const componentMap = {
  textSection: TextSection,
  wideMedia: WideMedia,
  fiftyFifty: FiftyFifty,
  columns: Columns
}

const ComponentRenderer = ({ item, prevTheme, nextTheme, index, isLastSection, isFirstSection }) => {
  if (!item || !item?._type) {
    return false
  }
  const Component = componentMap[item._type]
  if (!Component) {
    return false
  }
  // console.log(item)
  return Component
    ? (
      <Component
        {...item}
        prevTheme={prevTheme}
        nextTheme={nextTheme}
        isLastSection={isLastSection}
        isFirstSection={isFirstSection}
        index={index}
      />
    )
  : null
}

export default ComponentRenderer