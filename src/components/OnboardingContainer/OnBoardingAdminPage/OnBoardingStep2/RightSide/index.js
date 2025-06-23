import {
  Container,
  TypographyElement,
  Button,
  PasswordInput
} from '@pro_boa/ui'
import style from './style'
import Text from './text.json'
import { createUseStyles } from 'react-jss'
import { useFormik } from 'formik'
import { steps } from 'helpers/'
import { validatePassword } from 'helpers/validator'
import { useDispatch } from 'react-redux'
import { editOrganizationProfilePasswordAction } from 'pages/MyAccount/store'
import { setInvitedUserPassword } from 'pages/OnboardingContainer/store'

const useStyle = createUseStyles(style)

const noNotification = true

export default ({ setStep, isInvited = false }) => {
  const dispatch = useDispatch()
  const {
    rootClass,
    horizantalDivider,
    passwordStyle,
    buttonsContainer,
    formStyle
  } = useStyle()
  const { handleChange: onFormikHandleChange, handleSubmit, touched, errors, values } = useFormik({
    enableReinitialize: true,
    initialValues: {
      confirmPassword: '',
      password: ''
    },
    validate: validatePassword,
    onSubmit: values => {
      isInvited
        ? dispatch(setInvitedUserPassword({ password: values.password }))
        : dispatch(editOrganizationProfilePasswordAction(values.password, noNotification))
      setStep(steps.onBoardingThirdStep)
    }
  })

  return (
    <Container className={rootClass}>
      <div>
        <TypographyElement
          component='h3'
          spacing='0 0 16px 0'
          fontSizeMobile='24px'
          fontSizeTablet='24px'
          lineHeight='40px'
          variant='heading2'
          fontWeight='bold'
        >
          {isInvited ? Text.headerInvited : Text.header}
        </TypographyElement>
        <form className={formStyle}>
          <div className={passwordStyle}>
            <PasswordInput
              id='password'
              handleChange={onFormikHandleChange}
              value={values.password}
              type='password'
              status={(errors.password && touched.password) && 'error'}
              label={Text.passwordLabel}
              placeholder={Text.passwordLabel}
              message={errors.password}
            />
          </div>
          <PasswordInput
            id='confirmPassword'
            handleChange={onFormikHandleChange}
            value={values.confirmPassword}
            type='password'
            label={Text.confirmPasswordLabel}
            status={(errors.confirmPassword && touched.confirmPassword) && 'error'}
            placeholder={Text.confirmPasswordLabel}
            message={errors.confirmPassword}
          />
        </form>
      </div>
      <div>
        <div className={horizantalDivider} />
        <div className={buttonsContainer}>
          <Button
            handleClick={handleSubmit}
            label={Text.save}
            type='submit'
          />
        </div>
      </div>
    </Container>
  )
}
