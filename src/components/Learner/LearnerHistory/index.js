import Layout from 'components/Common/Layout'
import UserHistory from 'components/UserHistory'
import {
  Icon,
  Icons
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import { goBack } from 'connected-react-router'
import { useDispatch } from 'react-redux'

const useStyle = createUseStyles(style)

export default () => {
  const dispatch = useDispatch()
  const { icon, iconContainer } = useStyle()
  return (
    <Layout>
      <div className={iconContainer}>
        <div onClick={() => dispatch(goBack())}> <Icon iconName={Icons.roundedLeft} style={icon} /> </div>
      </div>
      <UserHistory />
    </Layout>
  )
}
