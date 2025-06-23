import React from 'react'
import { createUseStyles } from 'react-jss'
import style from './style.js'
import {
  TypographyElement,
  Spacing,
  neutral
} from '@pro_boa/ui'

export default ({ handleClick, value, dataTest }) => {
  const useStyle = createUseStyles(style)
  const { suggestionItem } = useStyle()
  return (
    <div
      className={suggestionItem}
      onClick={handleClick}
      data-test={dataTest}
    >
      <TypographyElement
        fontWeight={400}
        fontSize='11px'
        fontFamily='Muli Regular'
        margin={Spacing(1, 1, 1, 1)}
        lineHeight='15px'
        color={neutral[6]}
        cursor='pointer'
      >
        {value}
      </TypographyElement>
    </div>
  )
}
