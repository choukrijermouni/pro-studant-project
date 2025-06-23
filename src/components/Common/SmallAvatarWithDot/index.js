import { createUseStyles } from 'react-jss'
import {
  Avatar,
  ImageLink
} from '@pro_boa/ui'
import style from './style'
import Data from 'mock/profile.js'
import { avatarName } from 'helpers'

const useStyles = createUseStyles(style)
export default ({ image, name, loading }) => {
  const { avatarContainer } = useStyles()
  return (
    <div className={avatarContainer}>
      <Avatar img={image || ImageLink} name={avatarName(name || Data.name)} size='size_1' loading={loading} />
    </div>
  )
}
