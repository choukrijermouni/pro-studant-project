import { createUseStyles } from 'react-jss'
import { useEffect, useState } from 'react'
import {
  Avatar,
  AvatarSize,
  TypographyElement,
  neutral,
  Icon,
  red,
  Icons
} from '@pro_boa/ui'
import style from './style'
import Text from './text.json'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { amazonBucket, DMYDateFormat, teams } from 'constants/'
import {
  TeamDetailsNeutralPath,
  AffectationHistoryPath
} from 'Routes'
import moment from 'moment'
import { avatarName, isExpired } from 'helpers'
import { useParams } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from 'components/Common/PopOver'
import { requestCoursesAccessAction, resendWelcomeMessageAction } from 'pages/Learners/store'
import { useDrawer } from 'components/Common/Drawer/drawerContext'
import {
  fetchLearnerProgressionAction,
  sendNotificationAction,
  switchLastLicensePopupAction
} from 'pages/LearnerProfile/store'
import LastLicenseModal from 'components/Common/Drawer/AffectLicense/LastLicenseModal'

const defaultTeamImageIndex = 0

const useStyles = createUseStyles(style)
const noDate = true
export default ({
  size,
  manager,
  Name,
  Email,
  LastConnectionDate,
  EndDate,
  IsActive,
  Photo,
  TeamId,
  TeamImage,
  TeamName
}) => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { openDrawer, closeDrawer } = useDrawer()
  const {
    header,
    teamIcon,
    icon,
    card,
    iconLastLogin,
    infos,
    cardWithoutPointer,
    dotsPopoverContainer,
    popOverContent,
    linkTextStyle,
    disabledLinkTextStyle,
    dot,
    linkContainer,
    disabledLinkContainer
  } = useStyles()
  const { TotalLicensesRemaining } = useSelector(({ organization }) => organization.licenseInfo)
  const { OrganizationLicenseType } = useSelector(state => state.profile)
  const { organizationLicenseTypes } = useSelector(({ referential }) => referential)
  const [isOpen, setIsOpen] = useState(false)
  const { emailTypes } = useSelector(({ referential }) => referential)
  useEffect(() => {
    dispatch(fetchLearnerProgressionAction(id))
  }, [id])
  const { lastLicensePopupClosed } = useSelector(({ profile }) => profile)
  useEffect(() => {
    setIsOpen(!lastLicensePopupClosed)
  }, [lastLicensePopupClosed])
  const scale = window.devicePixelRatio
  const popOverContentMap = [
    {
      text: Text.affectLicense,
      onHandleClick: () => TotalLicensesRemaining
        ? openDrawer({
            componentName: 'affectLicense',
            props: {
              id,
              handleClose: closeDrawer
            }
          })
        : null,
      className: TotalLicensesRemaining ? linkTextStyle : disabledLinkTextStyle,
      containerClassName: TotalLicensesRemaining ? linkContainer : disabledLinkContainer,
      color: TotalLicensesRemaining ? neutral[6] : neutral[5]
    },
    {
      text: Text.reinviteLearner,
      onHandleClick: () => LastConnectionDate === null
        ? dispatch(resendWelcomeMessageAction([id], noDate))
        : null,
      className: LastConnectionDate === null ? linkTextStyle : disabledLinkTextStyle,
      containerClassName: LastConnectionDate === null ? linkContainer : disabledLinkContainer,
      color: LastConnectionDate === null ? neutral[6] : neutral[5]
    },
    {
      text: Text.editTeam,
      onHandleClick: () => openDrawer(
        {
          componentName: 'editLearnerTeam',
          props: {
            id: TeamId,
            closeModal: closeDrawer
          }
        }
      )
    },
    {
      text: Text.deleteLearner,
      onHandleClick: () => openDrawer(
        {
          componentName: 'removeLearner',
          props: {
            isLearnerProfile: true,
            handleClose: closeDrawer
          }
        }
      ),
      color: red[3]
    }
  ]
  const managerPopOverContentMap = [
    {
      text: Text.reinviteLearner,
      onHandleClick: () => LastConnectionDate === null ? dispatch(resendWelcomeMessageAction([id], noDate)) : null,
      className: LastConnectionDate === null ? linkTextStyle : disabledLinkTextStyle,
      containerClassName: LastConnectionDate === null ? linkContainer : disabledLinkContainer,
      color: LastConnectionDate === null ? neutral[6] : neutral[5]
    },
    {
      text: Text.askAccess,
      onHandleClick: () => dispatch(requestCoursesAccessAction(id))
    }
  ]
  const formattedPopOverContentMap = LastConnectionDate !== null ? popOverContentMap.filter(e => e.text !== Text.reinviteLearner) : popOverContentMap
  const formattedManagerPopOverContentMap = LastConnectionDate !== null ? managerPopOverContentMap.filter(e => e.text !== Text.reinviteLearner) : managerPopOverContentMap
  return (
    <>
      <LastLicenseModal
        openModal={isOpen}
        handleClose={() => {
          dispatch(sendNotificationAction(emailTypes.OrganizationLicensesDepleted))
          dispatch(switchLastLicensePopupAction(true))
          setIsOpen(false)
        }}
        handleSubmit={() => {
          dispatch(sendNotificationAction(emailTypes.OrganizationLicensesRequested))
          dispatch(switchLastLicensePopupAction(true))
          setIsOpen(false)
        }}
      />
      <div className={infos}>
        <Avatar
          size={size}
          img={Photo ? `${amazonBucket.bucketBaseUrl}${Photo}` : null}
          name={avatarName(Name)}
          IsActive={IsActive}
        />
        <div>
          <div className={infos}>
            <TypographyElement
              component='h3'
              variant='heading3'
              align='left'
              fontSize={scale > 1 ? '20px' : '30px'}
              spacing='20px 10px 30px 20px'
              color={neutral[6]}
            >
              {Name || ''}
            </TypographyElement>
            <TypographyElement
              component='h4'
              variant='caption1'
              align='left'
              spacing='23px 0 30px 0'
              color={neutral[5]}
            >
              {Email}
            </TypographyElement>
            <Popover>
              <PopoverTrigger>
                <div className={dotsPopoverContainer}>
                  <span className={dot} />
                  <span className={dot} />
                  <span className={dot} />
                </div>
              </PopoverTrigger>
              <PopoverContent topPosition={40}>
                {
                  !manager
                    ? (
                      <div className={popOverContent}>
                        {formattedPopOverContentMap.map((item, index) => (
                          <div
                            key={index}
                            className={item.containerClassName || linkContainer}
                            onClick={() => {
                              item.onHandleClick()
                            }}
                          >
                            <TypographyElement
                              key={index}
                              color={item.color || neutral[6]}
                              fontWeight='normal'
                              fontSize='13px'
                              lineHeight='16px'
                              className={item.className || linkTextStyle}
                            >
                              {item.text}
                            </TypographyElement>
                          </div>
                        ))}
                      </div>)
                    : (
                      <div className={popOverContent}>
                        {formattedManagerPopOverContentMap.map((item, index) => (
                          <div
                            key={index}
                            className={linkContainer}
                            onClick={() => {
                              item.onHandleClick()
                            }}
                          >
                            <TypographyElement
                              key={index}
                              handleClick={item.onHandleClick}
                              color={item.color || neutral[6]}
                              fontWeight='normal'
                              fontSize='13px'
                              lineHeight='16px'
                              className={item.className || linkTextStyle}
                            >
                              {item.text}
                            </TypographyElement>
                          </div>
                        ))}
                      </div>)
                }
              </PopoverContent>
            </Popover>
          </div>
          <div className={header}>
            {
              !manager && (
                <>
                  <div
                    data-test='learner-team-name'
                    className={card}
                    onClick={() => TeamId && dispatch(push(`${TeamDetailsNeutralPath}/${TeamId}`))}
                  >
                    {TeamId
                      ? (
                        <img
                          src={TeamImage || teams[defaultTeamImageIndex]}
                          alt='team' className={teamIcon}
                        />)
                      : null}
                    <TypographyElement
                      component='h4'
                      variant='caption1'
                      align='left'
                      spacing='10px 16px 11px 16px'
                      color={neutral[5]}
                    >
                      {TeamName || Text.withoutTeam}
                    </TypographyElement>
                    <Icon iconName={Icons.teams} style={icon} />
                  </div>
                  <div
                    className={card}
                    onClick={() => dispatch(push(`${AffectationHistoryPath}/${id}`))}
                  >
                    <Avatar
                      name={EndDate && moment(EndDate).isAfter(moment())
                        ? organizationLicenseTypes[OrganizationLicenseType]?.charAt(0)
                        : 'S'} size={AvatarSize.size_0}
                    />
                    <TypographyElement
                      dataTest='license-assignment-history'
                      component='h4'
                      variant='caption1'
                      align='left'
                      spacing='10px 16px 11px 16px'
                      color={neutral[5]}
                    >
                      {
                        EndDate
                          ? isExpired(EndDate)
                              ? Text.withoutLicense
                              : `${Text.license} ${Text.licenseTypes[organizationLicenseTypes[OrganizationLicenseType]]} ${Text.expire} ${moment(EndDate).format(DMYDateFormat)}`
                          : Text.withoutLicense
                      }
                    </TypographyElement>
                  </div>
                </>)
            }
            <div className={cardWithoutPointer}>
              <Icon iconName={Icons.lastUserLogin} style={iconLastLogin} />
              <TypographyElement
                component='h4'
                variant='caption1'
                align='left'
                spacing='10px 16px 11px 16px'
                color={neutral[5]}
              >
                {LastConnectionDate !== null
                  ? `${Text.lastConnection} ${moment(LastConnectionDate).format(DMYDateFormat)}`
                  : Text.neverConnected}
              </TypographyElement>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
