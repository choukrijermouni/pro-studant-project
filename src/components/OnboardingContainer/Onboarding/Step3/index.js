import {
  Container,
  TypographyElement,
  Button,
  PasswordInput,
  Paper,
  yellow,
  Icon,
  Icons
} from '@pro_boa/ui'
import style from './style'
import Text from './text.json'
import { createUseStyles } from 'react-jss'
import { useFormik } from 'formik'
import { validatePassword } from 'helpers/validator'
import { editOrganizationProfilePasswordAction } from 'pages/MyAccount/store'
import { useDispatch } from 'react-redux'
import { logo as pro_boa } from 'assets/index'
import { onboardingSteps, salesB2B } from 'constants/'

const useStyle = createUseStyles(style)

const noNotifications = true

export default ({ setStep }) => {
  const dispatch = useDispatch()
  const {
    rootClass,
    horizantalDivider,
    passwordStyle,
    licenseButtons,
    body,
    paper,
    logo,
    content,
    contactCard,
    icon,
    contact
  } = useStyle()
  const { handleChange: onFormikHandleChange, handleSubmit, errors, touched, values } = useFormik({
    initialValues: {
      confirmPassword: '',
      password: ''
    },
    validate: validatePassword,
    onSubmit: values => {
      dispatch(editOrganizationProfilePasswordAction(values.password, noNotifications))
      setStep(onboardingSteps.success)
    }
  })

  return (
    <div className={body}>
      <Paper className={paper}>
        <div className={content}>
          <Container className={rootClass}>
            <img src={pro_boa} alt='notification' className={logo} />
            <TypographyElement
              component='h3'
              spacing='56px 0 16px 0'
              lineHeight='40px'
              variant='heading2'
              fontWeight='bold'
            >
              {Text.header}
            </TypographyElement>
            <TypographyElement
              component='h4'
              variant='heading4'
              align='left'
              spacing='8px 0 34px 0'
              fontWeight='bold'
              color={yellow[3]}
            >
              {`${Text.Bonjour}${Text.changePassword}`}
            </TypographyElement>
            <form onSubmit={handleSubmit}>
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
              <TypographyElement
                component='h4'
                variant='heading4'
                align='left'
                spacing='34px 0 16px 0'
                fontWeight='bold'
              >
                {Text.contact}
              </TypographyElement>
              <div className={contactCard}>
                <div className={contact}>
                  <Icon iconName={Icons.smartPhone} style={icon} />
                  <TypographyElement
                    variant='heading4'
                    align='left'
                    spacing='17px 0 16px 16px'
                    fontWeight='bold'
                    Component='a'
                    cursor='pointer'
                    href={`tel:${salesB2B.SalesPhone}`}
                  >
                    {salesB2B.SalesPhone}
                  </TypographyElement>
                </div>
                <div className={contact}>
                  <Icon iconName={Icons.envelope} style={icon} />
                  <TypographyElement
                    variant='heading4'
                    align='left'
                    spacing='17px 0 16px 16px'
                    fontWeight='bold'
                    Component='a'
                    cursor='pointer'
                    href={`mailto:${salesB2B.SalesEmail}`}
                  >
                    {salesB2B.SalesEmail}
                  </TypographyElement>
                </div>

              </div>
              <div className={horizantalDivider} />
              <div className={licenseButtons}>
                <Button
                  handleClick={() => handleSubmit()}
                  width={153}
                  label={Text.save}
                />
              </div>
            </form>
          </Container>
        </div>
      </Paper>
    </div>
  )
}
