import { goBack } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { Icon, Icons } from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'

const useStyles = createUseStyles(style)

export default () => {
  const dispatch = useDispatch()
  const { iconContainer, icon } = useStyles()
  return (
    <div
      className={iconContainer}
      onClick={() => dispatch(goBack())}
    >
      <Icon iconName={Icons.roundedLeft} style={icon} />
    </div>
  )
}
