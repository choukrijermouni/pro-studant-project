import {
  Row,
  TypographyElement,
  neutral
} from '@pro_boa/ui'
import Text from './text.json'
import { helpLinks } from 'constants/'
import { help } from 'assets'
import { createUseStyles } from 'react-jss'
import style from './style'
import Layout from 'components/Common/Layout'
import Profile from 'components/MyAccount/Profile'

const useStyle = createUseStyles(style)

export default () => {
  const { container, header, iconHelp } = useStyle()
  return (
    <Layout>
      <div className={container}>
        <Row className={header}>
          <TypographyElement
            variant='heading2'
            fontSize='29px'
            lineHeight='36px'
            color={neutral[6]}
            spacing='0 0 0 0'
          >
            {Text.myAccount}
          </TypographyElement>
          <a href={helpLinks.help} target='_blank' rel='noreferrer'>
            <img src={help} alt='help' className={iconHelp} />
          </a>
        </Row>
        <Row>
          <Profile />
        </Row>
      </div>
    </Layout>
  )
}
