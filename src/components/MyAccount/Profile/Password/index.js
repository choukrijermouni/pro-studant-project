import {
  PasswordInput,
  TypographyElement,
  neutral,
  Button
} from '@pro_boa/ui'
import Text from './text.json'
import style from './style'
import { createUseStyles } from 'react-jss'
import { useFormik } from 'formik'
import { editOrganizationProfilePasswordAction } from 'pages/MyAccount/store'
import { useDispatch } from 'react-redux'

const useStyle = createUseStyles(style)

export default () => {
  const dispatch = useDispatch()
  const { formClass, container } = useStyle()
  const { handleChange: onFormikHandleChange, handleSubmit, values } = useFormik({
    initialValues: {
      password: ''
    },
    onSubmit: (values) => {
      dispatch(editOrganizationProfilePasswordAction(values.password))
      window.scrollTo(0, 0)
    }
  })
  return (
    <div className={container}>
      <TypographyElement
        variant='heading2'
        color={neutral[6]}
        fontSize='16px'
        spacing='24px 0 0 0'
        lineHeight='20px'
      >
        {Text.placeHolder}
      </TypographyElement>
      <form onSubmit={handleSubmit} className={formClass}>
        <PasswordInput
          dataTest='password-input'
          handleChange={onFormikHandleChange}
          value={values.recommendation}
          type='password'
          label={Text.title}
          id='password'
          placeholder={Text.title}
        />
        <Button
          dataTest='password-submit-button'
          handleClick={handleSubmit}
          type='submit'
          label={Text.buttonLabel}
          width='200px'
          disabled={!values.password}
        />
      </form>
    </div>
  )
}
