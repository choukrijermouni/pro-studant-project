import {
  Row,
  Avatar,
  TextInput,
  AvatarSize,
  neutral,
  Button,
  Icon,
  Icons
} from '@pro_boa/ui'
import style from './style'
import Text from './text.json'
import { createUseStyles } from 'react-jss'
import { useFormik } from 'formik'
import { validateAdmin } from 'helpers/validator'
import { amazonBucket } from 'constants/'
import { useEffect } from 'react'
import Password from './Password'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrganizationProfileAction, editOrganizationProfileAction, deleteAvatarProfileAction, updateAvatarProfileAction, getFlowIdAction } from 'pages/MyAccount/store'
import { avatarName } from 'helpers'
import {
  useGoCardlessDropin
} from '@gocardless/react-dropin'

const useStyle = createUseStyles(style)

const DropinButton = (options) => {
  const { open } = useGoCardlessDropin({ ...options })

  return (
    <button type='button' onClick={() => open()}>
      Start Dropin for <code>{options.billingRequestFlowID}</code> in
      <code>{options.environment}</code>
    </button>
  )
}

export default ({
  Submit,
  BirthDate,
  DeleteUserPicture,
  UpdateAvatar
}) => {
  const dispatch = useDispatch()
  const { Id, FirstName, LastName, Phone, Email, Photo, flowId } = useSelector(state => state.organizationProfile)
  const {
    rootClass,
    formRowClass,
    firstColClass,
    secondColClass,
    avatarGroupClass,
    formRootClass,
    textInputStyle,
    socialGroupClass,
    deleteBoxClass,
    pointerClass,
    editBoxClass,
    centerIconClass,
    inputClass
  } = useStyle()
  const { handleChange: onFormikHandleChange, handleBlur: onFormikHandleBlur, touched, errors, values, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: FirstName || '',
      lastName: LastName || '',
      phone: Phone || '',
      email: Email
    },
    validate: () => validateAdmin(values, Email),
    onSubmit: (values) => {
      dispatch(editOrganizationProfileAction(Id, values.firstName, values.lastName, values.phone, 1, values.email))
      window.scrollTo(0, 0)
    }
  })
  useEffect(() => { dispatch(fetchOrganizationProfileAction()) }, [])
  const { loading } = useSelector(state => state.config)
  const name = `${values.firstName} ${values.lastName}`
  useEffect(() => {
    dispatch(getFlowIdAction())
  }, [])

  return (
    <div className={rootClass}>
      <Row>
        <div className={avatarGroupClass}>
          <Avatar
            loading={loading}
            key={loading}
            size={AvatarSize.size_4}
            name={avatarName(name)}
            img={Photo ? `${amazonBucket.bucketBaseUrl}${Photo}` : null}
          />
        </div>
        <div className={socialGroupClass}>
          {
            Photo &&
            (
              <span onClick={() => dispatch(deleteAvatarProfileAction())} className={deleteBoxClass} data-test='delete-avatar-button'>
                <Icon iconName={Icons.bin} style={centerIconClass} />
              </span>
            )
          }
          <span className={editBoxClass} data-test='update-avatar-button'>
            <label htmlFor='avatar' className={pointerClass}>
              <Icon iconName={Icons.edit} style={centerIconClass} />
            </label>
            <input
              data-test='update-avatar'
              type='file'
              id='avatar'
              name='avatar'
              accept='image/png, image/jpeg'
              className={inputClass}
              onChange={(e) => dispatch(updateAvatarProfileAction(e.target.files[0]))}
            />
          </span>
        </div>
      </Row>
      <form className={formRootClass} onSubmit={handleSubmit}>
        <Row className={formRowClass}>
          <div className={firstColClass}>
            <TextInput
              dataTest='last-name-input'
              textInputClassName={textInputStyle}
              label={Text.inputLabels.lastName}
              placeholder={Text.inputPlaceHolder.lastName}
              handleChange={onFormikHandleChange}
              value={values.lastName}
              name='lastName'
              gutterBottom={16}
              status={(errors.lastName && touched.lastName) && 'error'}
              handleBlur={onFormikHandleBlur}
            />
            <TextInput
              dataTest='email-input'
              textInputClassName={textInputStyle}
              label={Text.inputLabels.email}
              placeholder={Text.inputPlaceHolder.email}
              handleChange={onFormikHandleChange}
              name='email'
              gutterBottom={16}
              value={values.email}
              status={(errors.email && touched.email) && 'error'}
              message={errors.email && touched.email ? errors.email : ''}
              handleBlur={onFormikHandleBlur}
            />
          </div>
          <div className={secondColClass}>
            <TextInput
              dataTest='first-name-input'
              textInputClassName={textInputStyle}
              label={Text.inputLabels.firstName}
              placeholder={Text.inputPlaceHolder.firstName}
              handleChange={onFormikHandleChange}
              name='firstName'
              gutterBottom={16}
              value={values.firstName}
              status={(errors.firstName && touched.firstName) && 'error'}
              handleBlur={onFormikHandleBlur}
            />
            <TextInput
              dataTest='phone-input'
              textInputClassName={textInputStyle}
              label={Text.inputLabels.phone}
              placeholder={Text.inputPlaceHolder.phone}
              handleChange={onFormikHandleChange}
              name='phone'
              color={neutral[0]}
              value={values.phone}
              status={(errors.phone && touched.phone) && 'error'}
              message={errors.phone && touched.phone ? errors.phone : ''}
              handleBlur={onFormikHandleBlur}
            />
          </div>
        </Row>
        <Row>
          <Button
            dataTest='submit-button'
            label={Text.save}
            width='200px'
            handleClick={handleSubmit}
            type='submit'
          />
        </Row>
      </form>
      <Password />
      <div>
        <DropinButton billingRequestFlowID={flowId} environment='live' />
      </div>
    </div>
  )
}
