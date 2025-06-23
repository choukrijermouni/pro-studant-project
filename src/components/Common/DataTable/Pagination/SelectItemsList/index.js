import React, { useState, useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import style from './style.js'
import SuggestionGroup from './SuggestionGroup'
import SuggestionItem from './SuggestionItem'
import {
  TypographyElement,
  neutral,
  Icon,
  Icons
} from '@pro_boa/ui'

export default ({ items = [], onSelectedItem, selectedItem = '', label = '', valueField = 'Value', typography, dataTest }) => {
  const node = useRef()
  const useStyles = createUseStyles(style)
  const [toggleSuggestionList, setToggleSuggestionList] = useState(false)
  const { selectListContainer, selectList, iconsContainer, arrowContainer, arrowStyle } = useStyles({ toggleSuggestionList })
  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])
  const handleClick = e => (!node.current.contains(e.target) && !toggleSuggestionList) && setToggleSuggestionList(false)
  return (
    <div className={selectListContainer} ref={node}>
      {
        label &&
        (
          <TypographyElement
            variant='extraSmallText'
            {...typography}
          >{label}
          </TypographyElement>
        )
      }
      <div
        data-test={dataTest}
        onClick={() => setToggleSuggestionList(!toggleSuggestionList)}
        className={selectList}
      >
        <TypographyElement
          fontWeight={400}
          fontSize='11px'
          fontFamily='Muli Regular'
          lineHeight='15px'
          color={neutral[5]}
        >
          {selectedItem}
        </TypographyElement>
        <div className={iconsContainer}>
          <div className={arrowContainer}>
            <Icon iconName={Icons.roundedUp} style={arrowStyle} />
          </div>
          <div className={arrowContainer}>
            <Icon iconName={Icons.roundedDown} style={arrowStyle} />
          </div>
        </div>
      </div>
      <SuggestionGroup toggleSuggestionList={toggleSuggestionList}>
        {items.map((option, i) =>
          <SuggestionItem
            dataTest={`${dataTest}-suggestion-item`}
            key={i}
            value={option[valueField]}
            handleClick={() => {
              setToggleSuggestionList(!toggleSuggestionList)
              onSelectedItem(option)
            }}
          />
        )}
      </SuggestionGroup>
    </div>
  )
}
