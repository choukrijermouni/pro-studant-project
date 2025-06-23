import {
  TypographyElement,
  Paper,
  blue,
  neutral
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text'
import NotificationCard from '../NotificationCard'
import Data from 'mock/notifications'
import { useState } from 'react'
import { push } from 'connected-react-router'
import { NotificationsPath } from 'Routes'
import { useDispatch } from 'react-redux'

const useStyle = createUseStyles(style)

export default () => {
  const dispatch = useDispatch()
  const [unseen, setUnseen] = useState(true)
  const { triangle, notificationHeader, notificationCardsContainer, notificationFooter, notificationPaper, cursor } = useStyle()
  return (
    <Paper className={notificationPaper}>
      <TypographyElement
        component='p'
        variant='heading4'
        align='left'
        fontSize='16px'
        className={triangle}
        lignHeight='15px'
        spacing='-12px 0 0 0'
        display='inline'
        color={neutral[0]}
      >
        {Text.triangle}
      </TypographyElement>
      <div className={notificationHeader}>
        <TypographyElement
          component='h4'
          variant='heading4'
          align='left'
          fontSize='19px'
          lignHeight='24px'
        >
          {Text.notificationTitle}
        </TypographyElement>
        <TypographyElement
          component='p'
          variant='heading4'
          align='left'
          fontSize='12px'
          lignHeight='15px'
          color={blue[0]}
        >
          <div className={cursor} onClick={() => setUnseen(false)}> {Text.seen}</div>
        </TypographyElement>
      </div>
      <div className={notificationCardsContainer}>
        {
        Data.map((Notification, key) => (
          <NotificationCard key={key} Data={Notification} unseen={unseen} />
        ))
      }
      </div>
      <div className={notificationFooter}>
        <TypographyElement
          component='p'
          variant='heading4'
          align='left'
          fontSize='12px'
          lignHeight='15px'
          color={neutral[4]}
        >
          <div className={cursor} onClick={() => dispatch(push(NotificationsPath))}>{Text.show}</div>
        </TypographyElement>
      </div>
    </Paper>
  )
}
