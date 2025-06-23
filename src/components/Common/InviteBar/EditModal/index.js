import {
  TypographyElement,
  Button,
  Status,
  TextArea,
  Col,
  Row,
  neutral,
  TextInput
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { teams } from 'constants/'
import { useFormik } from 'formik'
import validationSchema from './validator'
import { updateTeamAction } from 'pages/TeamDetails/store'
import { useDispatch, useSelector } from 'react-redux'
import { scrollUp } from 'helpers'

const useStyles = createUseStyles(style)

export default ({ teamName, closeModal, teamIcon, description }) => {
  const {
    modal,
    textArea,
    avatars,
    invitesBox,
    header,
    container,
    flex,
    body,
    overlay,
    disabled,
    titleClass
  } = useStyles()
  const dispatch = useDispatch()
  const { Id } = useSelector(state => state.teamDetails)
  const { handleSubmit, handleChange, resetForm, handleBlur, setFieldValue, touched, errors, values } = useFormik({
    initialValues: {
      name: teamName,
      details: description,
      image: teamIcon
    },
    validate: validationSchema,
    onSubmit: (values) => {
      resetForm()
      scrollUp()
      dispatch(updateTeamAction(Id, values.name, values.details, values.image))
      closeModal()
    },
    enableReinitialize: true
  })
  return (
    <form onSubmit={handleSubmit} data-test='edit-team-modal'>
      <div className={modal}>
        <div className={header}>
          <Col pos='left' className='col' grid={9}>
            <TypographyElement
              component='h3'
              variant='heading3'
              align='left'
              display='flex'
              className={titleClass}
            >
              {Text.title}
            </TypographyElement>
          </Col>
        </div>
        <Row>
          <div className={body}>
            <div className={container}>
              <TypographyElement
                component='h4'
                variant='smallText'
                align='left'
                spacing='0 0 13px'
              >
                {Text.subHeader}
              </TypographyElement>
              <div className={invitesBox}>
                <div className={avatars}>
                  {teams.map((element, id) =>
                    <div key={id} className={flex} data-test='team-icon'>
                      <img id={id} src={element} alt='teamTag' />
                      <div
                        id={element}
                        className={values.image === element ? disabled : overlay}
                        onClick={() => setFieldValue('image', element)}
                      />
                    </div>)}
                </div>
              </div>
              <div>
                <TypographyElement
                  fontSize='13px'
                  lineHeight='16px'
                  color={neutral[6]}
                  spacing='20px 0 13px'
                >
                  {Text.teamName}
                </TypographyElement>
                <TextInput
                  dataTest='team-name-input'
                  ErrorMessageDataTest='team-name-input-error'
                  label=''
                  id='name'
                  name='name'
                  type='text'
                  placeholder={teamName}
                  handleBlur={handleBlur}
                  value={values.name}
                  handleChange={handleChange}
                  status={errors.name && touched.name ? Status.error : null}
                  message={touched.name && errors.name ? errors.name : null}
                />
                <TypographyElement
                  fontSize='13px'
                  lineHeight='16px'
                  color={neutral[6]}
                  spacing='20px 0 13px'
                >
                  {Text.description}
                </TypographyElement>
                <TextArea
                  dataTest='team-description-input'
                  label=''
                  textareaClassName={textArea}
                  id='details'
                  name='details'
                  type='text'
                  placeholder={Text.description}
                  handleBlur={handleBlur}
                  value={values.details}
                  handleChange={handleChange}
                />
              </div>
            </div>
            <Button
              dataTest='save-button'
              type='submit'
              width='100%'
              label={Text.confirmButton}
              handleClick={handleSubmit}
            />
          </div>
        </Row>
      </div>
    </form>
  )
}
