import { createUseStyles } from 'react-jss'
import style from './style'
import {
  Icon,
  Icons,
  Avatar,
  Skeleton,
  AvatarSize
} from '@pro_boa/ui'

const useStyle = createUseStyles(style)

export default () => {
  const {
    icon,
    iconContainer,
    teamInfosSkeleton,
    titleStyle
  } = useStyle()
  return (
    <>
      <div className={iconContainer}>
        <div><Icon iconName={Icons.roundedLeft} style={icon} /></div>
        <div className={teamInfosSkeleton}>
          <Avatar loading size={AvatarSize.size_1} />
          <div className={titleStyle}>
            <Skeleton lines={1} height={40} margin='20px 10px 30px 20px' width='100%' />
            <Skeleton lines={1} height={40} margin='20px 0 30px' width={50} />
          </div>
        </div>
      </div>
      <Skeleton lines={2} height={20} width={['20%', '40%']} margin='16px 0px 0px 35px' />
    </>
  )
}
