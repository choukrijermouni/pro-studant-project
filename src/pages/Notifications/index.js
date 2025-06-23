import Layout from 'components/Common/Layout'
import NotificationCard from 'components/Notifications/NotificationCard'
import {
  TypographyElement
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Data from 'mock/notifications'
import Text from './text.json'

const useStyle = createUseStyles(style)

export default () => {
  const { cards, container } = useStyle()
  return (
    <Layout>
      <div className={container}>
        <TypographyElement
          component='h2'
          variant='heading2'
          align='left'
          fontSize='29px'
          lignHeight='36px'
          display='inline'
          spacing='30px 0 50px 0'
        >
          {Text.title}
        </TypographyElement>
        <div>
          {
            Data.map((Notification, key) => (
              <NotificationCard key={key} Data={Notification} className={cards} />
            ))
          }
        </div>
      </div>
    </Layout>
  )
}
