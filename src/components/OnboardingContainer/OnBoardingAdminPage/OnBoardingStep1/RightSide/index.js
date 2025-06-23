import { useEffect } from 'react'
import {
  Row,
  TypographyElement,
  Avatar,
  Icon,
  Icons,
  Button,
  TextInput,
  AvatarSize,
  neutral
} from '@pro_boa/ui'
import style from './style'
import Text from './text.json'
import { createUseStyles } from 'react-jss'
import { useFormik } from 'formik'
import { validateAdmin } from 'helpers/validator'
import { steps } from 'helpers/'
import { fetchOrganizationProfileAction, editOrganizationProfileAction, updateAvatarProfileAction, deleteAvatarProfileAction } from 'pages/MyAccount/store'
import { useDispatch, useSelector } from 'react-redux'
import { shrinkName } from 'helpers'
import { typographyClass, AdminRole, amazonBucket, Avatars } from 'constants/'
import { Oval } from 'assets'
import { setInvitedUserInfos } from 'pages/OnboardingContainer/store'

const useStyle = createUseStyles(style)

const noNotification = true

export default ({ setStep, isInvited = false }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(({ identity }) => identity)
  const { Id, FirstName, LastName, Photo, Phone, Email } = useSelector(({ organizationProfile }) => organizationProfile)
  const invitedEmail = useSelector(({ onboarding }) => onboarding?.invitation?.accountInfo?.Email)
  const invitatedUserData = useSelector(({ onboarding }) => onboarding?.invitation?.b2bNewUserOrganizationInfo)
  const {
    buttonsContainer,
    deleteBoxClass,
    editBoxClass,
    formRowClass,
    firstColClass,
    secondColClass,
    avatarGroupClass,
    socialGroupClass,
    centerIconClass,
    formRootClass,
    inputClass,
    pointerClass,
    subContainerClass,
    horizantalDivider,
    invitedButtonContainer
  } = useStyle({ Photo })
  const { handleChange: onFormikHandleChange, resetForm, handleBlur: onFormikHandleBlur, handleSubmit, touched, errors, values } = useFormik({
    initialValues: {
      firstName: isInvited ? '' : (FirstName || ''),
      lastName: isInvited ? '' : (LastName || ''),
      phone: isInvited ? '' : (Phone || ''),
      email: isInvited ? invitedEmail : Email
    },
    validate: () => validateAdmin(values, Email, isInvited),
    enableReinitialize: true,
    onSubmit: values => {
      !isInvited
        ? dispatch(editOrganizationProfileAction(Id, values.firstName, values.lastName, values.phone, values.FunctionId, values.email, noNotification))
        : dispatch(setInvitedUserInfos({
          TeamId: invitatedUserData.teamId,
          OrganizationId: invitatedUserData.organizationId,
          FirstName: values.firstName,
          LastName: values.lastName,
          Phone: values.phone,
          Password: '',
          Email: invitedEmail,
          InvitationId: invitatedUserData.invitationId
        }))
      setStep(steps.onBoardingSecendStep)
      resetForm()
    }
  })
  useEffect(() => { !isInvited && dispatch(fetchOrganizationProfileAction()) }, [Id])
  return (
    <>
      <div>
        {!isInvited
          ? (
            <TypographyElement
              component='h3'
              spacing='0 0 16px 0'
              lineHeight='40px'
              variant='heading2'
              fontWeight='bold'
            >
              {user?.role?.includes(AdminRole)
                ? Text.header
                : Text.manager.managerHeader}
            </TypographyElement>)
          : (
            <TypographyElement
              component='h3'
              spacing='0 0 16px 0'
              lineHeight='40px'
              variant='heading2'
              fontWeight='bold'
            >
              {Text.manager.invitedManagerHeader} {invitatedUserData.adminName} {Text.manager.toManageTeam} {invitatedUserData.teamName}
            </TypographyElement>)}
        <Row>
          <div className={avatarGroupClass}>
            <Avatar
              size={AvatarSize.size_4}
              img={isInvited ? `${amazonBucket.avatar}${Avatars.anonymous}` : (Photo ? `${amazonBucket.bucketBaseUrl}${Photo}` : Oval)}
              name={shrinkName(`${FirstName} ${LastName}`)}
            />
          </div>
          {!isInvited && (
            <div className={subContainerClass}>
              <div>
                <div className={socialGroupClass}>
                  <span onClick={() => Photo && dispatch(deleteAvatarProfileAction())} className={deleteBoxClass}>
                    <Icon iconName={Icons.bin} style={centerIconClass} />
                  </span>
                  <span className={editBoxClass}>
                    <label htmlFor='avatar' className={pointerClass}>
                      <Icon iconName={Icons.edit} style={centerIconClass} />
                    </label>
                    <input
                      type='file'
                      id='avatar'
                      name='avatar'
                      accept='image/png, image/jpeg'
                      className={inputClass}
                      onChange={(e) => dispatch(updateAvatarProfileAction(e.target.files[0]))}
                    />
                  </span>
                </div>
              </div>
              <div>
                <TypographyElement
                  variant='caption1'
                  spacing='0 0 16px 0'
                  fontSize='12px'
                  lineHeight='30px'
                  color={neutral[4]}
                >
                  {Text.uploadPhoto}
                </TypographyElement>
              </div>
            </div>)}
        </Row>
        <form className={formRootClass}>
          <Row className={formRowClass}>
            <div className={firstColClass}>
              <TextInput
                typography={typographyClass}
                label={Text.inputLabels.lastName}
                placeholder={Text.inputPlaceHolder.lastName}
                handleChange={onFormikHandleChange}
                value={values.lastName}
                name='lastName'
                gutterBottom={16}
                status={errors.lastName && touched.lastName ? 'error' : null}
                handleBlur={onFormikHandleBlur}
              />
              <TextInput
                typography={typographyClass}
                label={Text.inputLabels.email}
                placeholder={Text.inputPlaceHolder.email}
                handleChange={onFormikHandleChange}
                value={values.email}
                name='email'
                gutterBottom={16}
                disabled={isInvited}
                status={errors.email && touched.email ? 'error' : null}
                message={errors.email && touched.email ? errors.email : null}
                handleBlur={onFormikHandleBlur}
              />
            </div>
            <div className={secondColClass}>
              <TextInput
                typography={typographyClass}
                label={Text.inputLabels.firstName}
                placeholder={Text.inputPlaceHolder.firstName}
                handleChange={onFormikHandleChange}
                name='firstName'
                gutterBottom={16}
                value={values.firstName}
                status={errors.firstName && touched.firstName ? 'error' : null}
                handleBlur={onFormikHandleBlur}
              />
              {
                !isInvited && (
                  <TextInput
                    typography={typographyClass}
                    label={Text.inputLabels.phone}
                    placeholder={Text.inputPlaceHolder.phone}
                    handleChange={onFormikHandleChange}
                    name='phone'
                    value={values.phone}
                    status={errors.phone && touched.phone ? 'error' : null}
                    handleBlur={onFormikHandleBlur}
                  />
                )
              }
            </div>
          </Row>
        </form>
      </div>
      <Row>
        <div className={horizantalDivider} />
        {!isInvited
          ? (
            <div className={buttonsContainer}>
              <Button
                handleClick={() => setStep(steps.onBoardingSecendStep)}
                color={neutral[8]}
                variation='text'
                label={Text.skipThisStep}
              />
              <Button
                handleClick={() => handleSubmit()}
                disabled={errors.firstName || errors.lastName || errors.email}
                label={Text.save}
              />
            </div>
            )
          : (
            <div className={invitedButtonContainer}>
              <Button
                handleClick={() => handleSubmit()}
                disabled={errors.firstName || errors.lastName || errors.email}
                label={Text.save}
              />
            </div>)}
      </Row>
    </>
  )
}
