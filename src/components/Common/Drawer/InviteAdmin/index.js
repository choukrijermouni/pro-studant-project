import {
  TypographyElement,
  Button,
  Col,
  TextInput
} from '@pro_boa/ui'
import { useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { useDispatch, useSelector } from 'react-redux'
import { validateInviteManagerEmail } from 'helpers/validator'
import { fetchAllTeamsAction } from 'pages/Teams/store'
import { useFormik } from 'formik'
import { scrollUp } from 'helpers'
import { inviteAdminAction } from 'pages/Admin/store'

const useStyle = createUseStyles(style)

export default ({ handleClose }) => {
  const { input, root, header, textarea } = useStyle()
  const dispatch = useDispatch()
  const { isManager, Id } = useSelector(({ organizationProfile }) => organizationProfile)
  useEffect(() => {
    dispatch(fetchAllTeamsAction(isManager ? Id : null))
  }, [])

  const { handleChange, handleBlur, touched, errors, values, isValid, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: {
      inviteEmail: ''
    },
    validate: () => validateInviteManagerEmail(values),
    onSubmit: (values) => {
      scrollUp()
      dispatch(inviteAdminAction(values.inviteEmail))
      handleClose()
    }
  })
  return (
    <div className={root}>
      <div className={header}>
        <Col pos='left' className='col' grid={9}>
          <TypographyElement
            component='h3'
            variant='heading3'
            align='left'
          >
            {Text.titleInvite}
          </TypographyElement>
        </Col>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={input}>
          <TypographyElement
            variant='body1'
            fontSize='12px'
            lineHeight='18px'
            margin='0 0 4px'
          >
            {Text.label.email}
          </TypographyElement>
          <TextInput
            textareaClassName={textarea}
            type='text'
            placeholder={Text.placeholder}
            value={values.inviteEmail}
            name='inviteEmail'
            status={(errors.inviteEmail && touched.inviteEmail) && 'error'}
            message={errors.inviteEmail && touched.inviteEmail ? errors.inviteEmail : ''}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        </div>
        <Button
          marginButton='24px 0 0 0'
          label={Text.download}
          width='100%'
          disabled={!isValid}
          type='submit'
        />
      </form>
    </div>
  )
}
