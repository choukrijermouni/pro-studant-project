import React from 'react'
import { createUseStyles } from 'react-jss'
import style from '../style.js'

export default ({ children, toggleSuggestionList = false }) => {
  const useStyle = createUseStyles(style)
  const { suggestionGroup } = useStyle({ toggleSuggestionList })
  return (
    <div className={suggestionGroup}>
      {children}
    </div>
  )
}
