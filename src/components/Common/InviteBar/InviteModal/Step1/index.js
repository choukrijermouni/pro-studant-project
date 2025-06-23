import {
  TypographyElement,
  Icon,
  Icons,
  Avatar,
  AvatarSize,
  Button,
  ButtonVariation,
  ButtonSize,
  SearchableSelectList
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { invitation } from 'assets'
import { avatarName } from 'helpers'
import { useDispatch, useSelector } from 'react-redux'
import { annualLicenseType, billingCycleId, contactB2B, monthlyLicenseType, trialLicenseType } from 'constants/'
import { fetchListTeamsAction } from 'pages/Teams/store'
import { useEffect, useState } from 'react'
import { fetchLicenseInfoAction } from 'pages/Home/store'
import { inviteLearnersAction } from 'pages/Learners/store'

const useStyles = createUseStyles(style)
const noLoader = true

export default ({ nextStep, editLearners, closeModal, learners, subscriptionType, setSubscriptionType, setSelectedTeam, selectedTeam }) => {
  const dispatch = useDispatch()
  const {
    modal,
    avatars,
    invitesBox,
    invites,
    icon,
    header,
    userImage,
    editIcon,
    licenseButtons,
    line,
    circle,
    input,
    footer,
    noLicenseMessageContainer,
    image
  } = useStyles()
  const teams = useSelector(state => state.teams).list
  useEffect(() => {
    dispatch(fetchListTeamsAction())
    dispatch(fetchLicenseInfoAction(noLoader))
  }, [])
  const { licenseInfo } = useSelector(state => state.organization)
  const LicenseDetails = (licenseType) => licenseInfo?.OrganizationLicenseDetails?.find(license => license?.OrganizationLicenseType === licenseType)
  const reformedData = teams.map(element => {
    element.Value = element.Name
    return element
  })
  reformedData.push({
    Id: 0,
    Value: Text.withoutTeam
  })
  const [selectData, setSelectData] = useState({ selectedItemId: 1, selectedItemValue: '', reformedData: reformedData })
  const licenseAvailable = (
    ((LicenseDetails(monthlyLicenseType)?.LicenseTypeRemaining && LicenseDetails(monthlyLicenseType)?.LicenseTypeRemaining !== 0) ||
      (LicenseDetails(annualLicenseType)?.LicenseTypeRemaining && LicenseDetails(annualLicenseType)?.LicenseTypeRemaining !== 0) ||
      (LicenseDetails(trialLicenseType)?.LicenseTypeRemaining && LicenseDetails(trialLicenseType)?.LicenseTypeRemaining !== 0))
  )
  const licenseExists = (
    ((LicenseDetails(monthlyLicenseType)?.LicenseQuantity && LicenseDetails(monthlyLicenseType)?.LicenseQuantity !== 0) ||
      (LicenseDetails(annualLicenseType)?.LicenseQuantity && LicenseDetails(annualLicenseType)?.LicenseQuantity !== 0) ||
      (LicenseDetails(trialLicenseType)?.LicenseQuantity && LicenseDetails(trialLicenseType)?.LicenseQuantity !== 0))
  )
  return (
    <div>
      <div className={modal}>
        <div className={header}>
          <img className={image} src={invitation} alt='invitation' />
          <TypographyElement
            component='h2'
            variant='heading2'
            align='left'
            spacing='20px 0 8px 0'
          >
            {Text.inviteTitle}
          </TypographyElement>
        </div>
        <div>
          <TypographyElement
            component='h3'
            variant='heading3'
            align='left'
            spacing='8px 0 16px 0'
          >
            {Text.subHeader.first}{learners.length} {Text.subHeader.second}
          </TypographyElement>
          <div className={invitesBox}>
            <div className={invites}>
              <Icon iconName={Icons.admin} style={icon} />
              <TypographyElement
                component='h3'
                variant='heading3'
                align='left'
                spacing='0 200px 0px 27px'
              >
                {Text.learner}
              </TypographyElement>
            </div>
            <div className={avatars}>
              {learners.slice(0, 4).map((element, id) =>
                <div key={id} className={userImage}>
                  <Avatar
                    img={null}
                    name={avatarName(element)}
                    size={AvatarSize.size_1}
                    cursor='default'
                  />
                </div>)}
              <div className={circle}>{learners.length}</div>
              <Icon
                iconName={Icons.edit}
                style={editIcon}
                handleIconClick={editLearners}
              />
            </div>
          </div>
          <TypographyElement
            component='h3'
            variant='heading3'
            align='left'
            spacing='24px 0 16px 0'
          >
            {Text.licenseAffect}
          </TypographyElement>
          <div className={licenseButtons}>
            <Button
              dataTest='without-license-button'
              backgroundColorHover='none'
              variation={subscriptionType === billingCycleId.without ? ButtonVariation.primary : ButtonVariation.secondary}
              size={ButtonSize.big}
              width={128}
              height={70}
              label={Text.withoutButton}
              handleClick={() => setSubscriptionType(billingCycleId.without)}
            />
            <Button
              dataTest='trial-license-button'
              backgroundColorHover='none'
              variation={subscriptionType === billingCycleId.trial ? ButtonVariation.primary : ButtonVariation.secondary}
              size={ButtonSize.big}
              width={128}
              height={70}
              label={Text.trialButton}
              handleClick={() => setSubscriptionType(billingCycleId.trial)}
              disabled={!LicenseDetails(trialLicenseType)?.LicenseTypeRemaining || LicenseDetails(trialLicenseType)?.LicenseTypeRemaining < learners.length}
            />
            <Button
              dataTest='annual-license-button'
              backgroundColorHover='none'
              variation={subscriptionType === billingCycleId.annual ? ButtonVariation.primary : ButtonVariation.secondary}
              size={ButtonSize.big}
              width={128}
              height={70}
              label={Text.yearlyButton}
              handleClick={() => setSubscriptionType(billingCycleId.annual)}
              disabled={!LicenseDetails(annualLicenseType)?.LicenseTypeRemaining || LicenseDetails(annualLicenseType)?.LicenseTypeRemaining < learners.length}
            />
            <Button
              dataTest='monthly-license-button'
              backgroundColorHover='none'
              variation={subscriptionType === billingCycleId.monthly ? ButtonVariation.primary : ButtonVariation.secondary}
              size={ButtonSize.big}
              width={128}
              height={70}
              label={Text.monthlyButton}
              handleClick={() => setSubscriptionType(billingCycleId.monthly)}
              disabled={!LicenseDetails(monthlyLicenseType)?.LicenseTypeRemaining || LicenseDetails(monthlyLicenseType)?.LicenseTypeRemaining < learners.length}
            />
          </div>
          <div className={footer}>
            {
              licenseAvailable
                ? (
                  <div>
                    <TypographyElement
                      component='h4'
                      variant='caption1'
                      align='left'
                      spacing='20px 0 0px 0'
                    >
                      {Text.monthlyLicenseLeft}{LicenseDetails(monthlyLicenseType)?.LicenseTypeRemaining || 0}
                    </TypographyElement>
                    <TypographyElement
                      component='h4'
                      variant='caption1'
                      align='left'
                      spacing='0px 0 0px 0'
                    >
                      {Text.yearlyLicenseLeft}{LicenseDetails(annualLicenseType)?.LicenseTypeRemaining || 0}
                    </TypographyElement>
                    <TypographyElement
                      component='h4'
                      variant='caption1'
                      align='left'
                      spacing='0px 0 15px 0'
                    >
                      {Text.trialLicenseLeft}{LicenseDetails(trialLicenseType)?.LicenseTypeRemaining || 0}
                    </TypographyElement>
                  </div>
                  )
                : (
                  <div className={noLicenseMessageContainer}>
                    <TypographyElement
                      component='h4'
                      variant='caption1'
                      align='left'
                      spacing='20px 0 15px 0'
                    >
                      {`${licenseExists ? Text.noLicenseLeftMessage : Text.noLicenseMessage} ${contactB2B.ContactName} ${Text.on} ${contactB2B.ContactEmail}  ${Text.or} ${contactB2B.ContactPhone} ${Text.forGettingNewLicenses}`}
                    </TypographyElement>
                  </div>
                  )
            }
            {
              teams.length
                ? (
                  <span className={input}>
                    <SearchableSelectList
                      dataTest='teams-select-list'
                      iconDataTest='teams-select-list-icon'
                      items={reformedData}
                      placeholder={Text.allTeams}
                      selectedItem={selectData.selectedItemValue}
                      name='teams'
                      gutterBottom={16}
                      onSelectedItem={(item) => {
                        setSelectData({
                          ...selectData,
                          selectedItemValue: selectData.reformedData.find((element) => element.Id === item.Id).Value,
                          selectedItemId: item.Id
                        })
                        setSelectedTeam(item.Id)
                      }}
                      handleChange={(e) => setSelectData({
                        ...selectData,
                        selectedItemValue: e.target.value,
                        toggleSuggestionList: (e.target.value !== '')
                      })}
                    />
                  </span>
                  )
                : null
            }
          </div>
          <hr className={line} />
          <div className={licenseButtons}>
            <Button
              variation={ButtonVariation.secondary}
              size={ButtonSize.big}
              width={153}
              height={54}
              label={Text.abortButton}
              handleClick={closeModal}
            />
            <Button
              dataTest='confirm-invite-button'
              variation={ButtonVariation.primary}
              size={ButtonSize.big}
              width={153}
              height={54}
              label={Text.confirmButton}
              handleClick={() => dispatch(inviteLearnersAction(learners, subscriptionType, selectedTeam, nextStep, closeModal))}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
