import Layout from 'components/Common/Layout'
import Data from 'mock/notifications'
import NotificationCard from 'components/Notifications/NotificationCard'
import ProfileInfo from 'components/Profile/ProfileInfo'
import {
  TypographyElement
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'

const useStyle = createUseStyles(style)

export default () => {
  const { cards, container } = useStyle()
  return (
    <Layout>
      <ProfileInfo size='size_4' manager />
      <div className={container}>
        <TypographyElement
          component='h2'
          variant='heading2'
          align='left'
          fontSize='20px'
          fontWeight='bold'
          lignHeight='36px'
          display='inline'
          spacing='24px 0 24px 0'
        >
          {Text.title}
        </TypographyElement>
      </div>
      <div>
        {Data.map((Notification, key) => (
          <NotificationCard key={key} Data={Notification} className={cards} />
        ))}
      </div>
    </Layout>
  )
}
