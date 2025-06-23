import React from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
import { Icon, Icons } from '@pro_boa/ui'

const useStyle = createUseStyles(style)

export default (props) => {
  const { bannerGroup, iconStyle } = useStyle(props)
  return (
    <div className={bannerGroup}>
      <Icon iconName={Icons.alert} style={iconStyle} />
      <div>
        {props.children}
      </div>
    </div>
  )
}
