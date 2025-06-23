import { useState } from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
import {
  TypographyElement,
  neutral
} from '@pro_boa/ui'

const useStyle = createUseStyles(style)

export default (props) => {
  let timeout
  const [active, setActive] = useState(false)

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true)
    }, props.delay || 200)
  }

  const hideTip = () => {
    clearInterval(timeout)
    setActive(false)
  }
  const { toolTipStyle, TooltipWrapper } = useStyle()
  return (
    <div
      className={TooltipWrapper}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {props.children}
      {(active && !props.show) && (
        <div className={toolTipStyle}>
          <TypographyElement
            component='h4'
            variant='smallText'
            color={neutral[0]}
            display='inline'
            spacing='0 5px 3px'
            fontWeight={300}
          >
            {props.content}
          </TypographyElement>
        </div>
      )}
    </div>
  )
}
