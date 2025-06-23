import {
  Avatar,
  AvatarSize
} from '@pro_boa/ui'
import { avatarName } from 'helpers'

export default ({ size, image, name }) => <Avatar img={image} name={avatarName(name)} size={size || AvatarSize.size_4} />
