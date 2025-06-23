import {
  Row,
  TypographyElement,
  TextInput,
  Button,
  Icon,
  Icons,
  Col
} from '@pro_boa/ui'
import { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useDispatch } from 'react-redux'
import { addAdminsAction } from 'pages/Admin/store'
import style from './style'
import Text from './text.json'
import { useFormik } from 'formik'
import { validateEmail } from 'helpers/validator'

const useStyle = createUseStyles(style)

export default () => {
  const { invites, icon, root } = useStyle()
  const [arrowInvite, setArrowInvite] = useState(true)
  const dispatch = useDispatch()
  const { handleChange: onFormikHandleChange, handleSubmit, errors, touched, values } = useFormik({
    initialValues: {
      email: ''
    },
    validate: validateEmail,
    onSubmit: values => {
      dispatch(dispatch(addAdminsAction(values.email)))
    }
  })
  return (
    <div className={root}>
      <Row>
        <Col pos='left' className='col' grid={9}>
          <TypographyElement
            component='h3'
            variant='heading3'
            align='left'
            spacing='20px 0 30px 0px'
          >
            {Text.invite}
          </TypographyElement>
        </Col>
        <Col pos='right' className='col' grid={3}>
          {
            arrowInvite
              ? <Icon
                  iconName={Icons.roundedUp}
                  style={icon}
                  handleIconClick={() => setArrowInvite(!arrowInvite)}
                />
              : <Icon
                  iconName={Icons.roundedDown}
                  style={icon}
                  handleIconClick={() => setArrowInvite(!arrowInvite)}
                />
          }
        </Col>
      </Row>
      {
        arrowInvite &&
          <Row className='row' justify='left'>
            <TextInput
              textInputClassName={invites}
              type='text'
              id='email'
              handleChange={onFormikHandleChange}
              value={values.email}
              status={(errors.email && touched.email) && 'error'}
              placeholder={Text.placeholder}
              message={errors.email}
            />
            <Button
              marginButton='24px 0 0 0'
              label='Inviter'
              width='312px'
              handleClick={() => { handleSubmit() }}
            />
          </Row>
      }
    </div>
  )
}
