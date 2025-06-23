import {
  Row,
  TypographyElement,
  TextArea,
  Button,
  Icon,
  Icons,
  Col
} from '@pro_boa/ui'
import { useState } from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'

const useStyle = createUseStyles(style)

export default () => {
  const { invites, icon } = useStyle()
  const [arrowInvite, setArrowInvite] = useState(true)
  return (
    <>
      <Row>
        <Col pos='left' className='col' grid={9}>
          <TypographyElement
            component='h3'
            variant='heading3'
            align='left'
            spacing='20px 0 30px 24px'
          >
            {Text.invite}
          </TypographyElement>
        </Col>
        <Col pos='right' className='col' grid={3}>
          {
            arrowInvite
              ? <Icon iconName={Icons.roundedUp} style={icon} handleIconClick={() => setArrowInvite(!arrowInvite)} />
              : <Icon iconName={Icons.roundedDown} style={icon} handleIconClick={() => setArrowInvite(!arrowInvite)} />
          }
        </Col>
      </Row>
      {
        arrowInvite &&
          <Row className='row' justify='center'>
            <TextArea label='' textareaClassName={invites} id='1' type='text' placeholder={Text.placeholder} />
            <Button marginButton='24px 0 0 0' label='Inviter' width='312px' />
          </Row>
      }
    </>
  )
}
