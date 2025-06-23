import {
  TypographyElement,
  blue,
  Icon,
  Icons,
  neutral
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import styles from './style'
import Text from './text'
import SmallAvatarWithDot from '../../Common/SmallAvatarWithDot'
import classNames from 'classnames'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { LearnerProfileNeutralPath } from 'Routes'

const useStyle = createUseStyles(styles)

export default ({ unseen, Data = [], ...props }) => {
  const dispatch = useDispatch()
  const { textContainer, icon, avatarContainer, notificationCard } = useStyle({ unseen })
  return (
    <div className={classNames(props.className, notificationCard)} onClick={() => dispatch(push(`${LearnerProfileNeutralPath}/1`))}>
      <div className={avatarContainer}>
        <SmallAvatarWithDot image={Data.image} />
        <div className={textContainer}>
          <div>
            <TypographyElement
              component='p'
              variant='heading4'
              align='left'
              fontSize='16px'
              lignHeight='15px'
              display='inline'
              color={neutral[6]}
            >
              {Data.author || ''}
            </TypographyElement>
            <TypographyElement
              component='p'
              variant='heading4'
              align='left'
              fontSize='16px'
              lignHeight='15px'
              fontWeight='200'
              display='inline'
              color={neutral[4]}
            >
              {Data.action || ''}
            </TypographyElement>
            <TypographyElement
              component='p'
              variant='heading4'
              align='left'
              fontSize='16px'
              lignHeight='15px'
              display='inline'
              color={blue[0]}
            >
              {Data.link || ''}
            </TypographyElement>
          </div>
          <TypographyElement
            component='p'
            variant='heading4'
            align='left'
            fontSize='12px'
            lignHeight='15px'
            color={neutral[4]}
          >
            {Text.time}
          </TypographyElement>
        </div>
      </div>
      <Icon iconName={Icons.roundedUp} style={icon} />
    </div>
  )
}
