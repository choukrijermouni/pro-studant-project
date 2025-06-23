import {
  TypographyElement,
  Button,
  ButtonSize,
  ButtonVariation,
  Icon,
  Icons,
  neutral,
  red
} from '@pro_boa/ui'
import { useEffect, useState } from 'react'
import { help } from 'assets'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchLearnerAttributionHistoryAction,
  deleteUserAction
} from 'pages/LearnerProfile/store'
import {
  DMYDateFormat,
  helpLinks,
  AdminRole
} from 'constants/'
import moment from 'moment'
import { push } from 'connected-react-router'
import DeleteLearnerModal from 'components/DeleteLearnerModal'
import { AffectationHistoryPath } from 'Routes'
import { fetchLicenseInfoAction } from 'pages/Home/store'
import LearnerTeam from '../../Drawer/LearnerTeam'
import AffectLicense from '../../Drawer/AffectLicense'

const useStyle = createUseStyles(style)

const licenseAttributionHistoryIndex = 0
const noLoaderAction = true

export default () => {
  const {
    license,
    icon,
    licenseTitle,
    newHelpMessage,
    helpIcon,
    historyContainer,
    iconCalendar,
    historyInfo,
    historyIcons,
    slidIn,
    slidOut
  } = useStyle()
  const [arrowHistory, setArrowHistory] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const { id } = useParams()
  const { licenseAttributionHistory, Email } = useSelector(state => state.profile)
  const { organizationLicenseTypes } = useSelector(state => state.referential)
  const { user } = useSelector(({ identity }) => identity)
  useEffect(() => { dispatch(fetchLicenseInfoAction(noLoaderAction)) }, [])
  useEffect(() => { dispatch(fetchLearnerAttributionHistoryAction(id)) }, [id])
  return (
    <div className={license}>
      <AffectLicense />
      {licenseAttributionHistory.length > 0 && (
        <div className={licenseTitle} onClick={() => setArrowHistory(!arrowHistory)}>
          <TypographyElement
            component='h3'
            variant='heading3'
            align='left'
          >
            {Text.history.historyTitle}
          </TypographyElement>
          {
            arrowHistory
              ? (
                <Icon
                  iconName={Icons.roundedUp}
                  style={icon}
                />)
              : (
                <Icon
                  iconName={Icons.roundedDown}
                  style={icon}
                />)
          }
        </div>
      )}

      {licenseAttributionHistory.length > 0 && (
        (
          <div className={arrowHistory ? slidIn : slidOut}>
            <div className={historyContainer}>
              <Icon
                iconName={Icons.calendar}
                style={iconCalendar}
              />
              <div className={historyInfo}>
                <TypographyElement
                  component='h4'
                  variant='body1'
                  align='left'
                  spacing='0 0 10px 0'
                >
                  {licenseAttributionHistory[licenseAttributionHistoryIndex]?.OrganizationLicenseType
                    ? `${Text.License} ${Text.licenseTypes[organizationLicenseTypes[licenseAttributionHistory[licenseAttributionHistoryIndex]?.OrganizationLicenseType]]} (${licenseAttributionHistory[licenseAttributionHistoryIndex]?.QuantityAssigned})`
                    : Text.history.noLicense}
                </TypographyElement>
                <TypographyElement
                  component='h4'
                  variant='caption2'
                  align='left'
                  spacing='0 0 10px 0'
                  color={neutral[5]}
                >
                  <Icon
                    iconName={Icons.admin}
                    style={historyIcons}
                  />
                  {licenseAttributionHistory[licenseAttributionHistoryIndex]?.AdminName
                    ? licenseAttributionHistory[licenseAttributionHistoryIndex]?.AdminName
                    : Text.history.noName}
                </TypographyElement>
                <TypographyElement
                  component='h4'
                  variant='caption2'
                  align='left'
                  color={neutral[5]}
                >
                  <Icon
                    iconName={Icons.clock}
                    style={historyIcons}
                  />
                  {licenseAttributionHistory[licenseAttributionHistoryIndex]?.OperationDate
                    ? moment(licenseAttributionHistory[licenseAttributionHistoryIndex]?.OperationDate).format(DMYDateFormat)
                    : Text.history.noDate}
                </TypographyElement>
              </div>
            </div>
            <Button
              backgroundColorHover='none'
              variation={ButtonVariation.primary}
              size={ButtonSize.big}
              label={Text.history.viewAll}
              marginButton='24px 0 15px 0'
              width='100%'
              height={47}
              handleClick={() => dispatch(push(`${AffectationHistoryPath}/${id}`))}
            />
            <a className={newHelpMessage} href={helpLinks.learnerProfile} rel='noopener noreferrer' target='_blank'>
              <img src={help} alt='help' className={helpIcon} />
              <TypographyElement
                component='h4'
                variant='smallText'
                align='left'
                color={neutral[3]}
              >
                {Text.history.helpMessage}
              </TypographyElement>
            </a>
          </div>
        )

      )}
      {user?.role?.includes(AdminRole)
        ? (
          <>
            <LearnerTeam />
            <TypographyElement
              component='h4'
              variant='smallLink'
              align='left'
              spacing='32px 0 30px 0'
              color={red[3]}
              cursor='pointer'
              handleClick={() => setIsOpen(true)}
              dataTest='remove-learner-button'
            >
              {Text.deleteUser}
            </TypographyElement>
            <DeleteLearnerModal
              openModal={isOpen}
              handleClose={() => setIsOpen(false)}
              handleSubmit={() => {
                dispatch(deleteUserAction([id]))
                setIsOpen(false)
              }}
              email={Email}
            />
          </>
          )
        : null}
    </div>
  )
}
