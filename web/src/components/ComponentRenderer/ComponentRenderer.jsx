import React from 'react'
import SanityRichText from 'src/components/SanityRichText'

const componentMap = {
  standardText: SanityRichText,
}

const ComponentRenderer = ({ item, prevTheme, nextTheme, index, isLastSection, isFirstSection }) => {
  const Component = componentMap[item._type]
  console.log(item._type)
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