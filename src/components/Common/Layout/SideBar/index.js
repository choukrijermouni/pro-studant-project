import { TypographyElement, neutral, Icon, Icons } from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { AdminPath } from 'Routes'
import { AdminRole } from 'constants/'

const useStyle = createUseStyles(style)

export default ({ children, open }) => {
  const scale = window.devicePixelRatio
  const dispatch = useDispatch()
  const { side, container, kids, bottom, iconHeader, paramsText } = useStyle({ open, scale })
  const { user } = useSelector(({ identity }) => identity)
  return (
    <div className={side}>
      <div>
        <div className={container} />
        <div className={kids}>
          {children}
        </div>
        {user?.role?.includes(AdminRole)
          ? (
            <div className={bottom} onClick={() => dispatch(push(AdminPath))}>
              <Icon iconName={Icons.setting} style={iconHeader} />
              <span className={paramsText}>
                <TypographyElement
                  variant='heading2'
                  color={neutral[4]}
                  fontWeight={400}
                  fontSize='14px'
                  lineHeight='20px'
                >{Text.parameters}
                </TypographyElement>
              </span>
            </div>)
          : null}
      </div>
    </div>
  )
}
