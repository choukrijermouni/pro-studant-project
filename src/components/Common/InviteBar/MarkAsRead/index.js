import {
  Row,
  TypographyElement,
  Button,
  neutral
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { help } from 'assets'

const useStyle = createUseStyles(style)

export default () => {
  const { root, messageContainer } = useStyle()
  return (

    <div className={root}>
      <Row>
        <Row className='row' justify='left'>
          <Button marginButton='24px 0 0 0' label={Text.title} width='312px' />
        </Row>
        <div className={messageContainer}>
          <img src={help} alt='helpIcon' />
          <TypographyElement
            component='h4'
            variant='smallText'
            align='left'
            spacing='30px 0 30px 10px'
            color={neutral[3]}
          >
            {Text.suiviMessage}
          </TypographyElement>
        </div>
      </Row>
    </div>

  )
}
