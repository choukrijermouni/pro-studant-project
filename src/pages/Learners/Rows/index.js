
import { createUseStyles } from 'react-jss'
import style from '../style'
import { amazonBucket, Avatars, DMYDateFormat, OrganizationLicenseTypeEnum } from 'constants/'
import Text from '../text.json'
import {
  TypographyElement,
  blue,
  Avatar,
  neutral,
  red,
  TableCell
} from '@pro_boa/ui'
import { avatarName, isExpired, scrollUp } from 'helpers'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { Popover, PopoverContent, PopoverTrigger } from 'components/Common/PopOver'
import { requestCoursesAccessAction, resendWelcomeMessageAction } from '../store'
import { cancelLearnerInvitationAction, fetchLearnerProfileAction } from 'pages/LearnerProfile/store'
import { useDrawer } from 'components/Common/Drawer/drawerContext'

const useStyle = createUseStyles(style)
const noDate = true
export const EndDateRow = ({ item, organizationLicenseTypes, value, setPage }) => {
  const {
    subTypeContainer,
    avatarContainer,
    cellContainer,
    dotsPopoverContainer,
    dot,
    popOverContent,
    linkTextStyle,
    endRowContainer,
    disabledLinkTextStyle,
    linkContainer,
    disabledLinkContainer
  } = useStyle()
  const dispatch = useDispatch()
  const { TotalLicensesRemaining } = useSelector(({ organization }) => organization.licenseInfo)
  const { isManager } = useSelector(({ organizationProfile }) => organizationProfile)
  const { openDrawer, closeDrawer } = useDrawer()
  const popOverContentMap = [
    {
      text: Text.affectLicense,
      onHandleClick: () => TotalLicensesRemaining
        ? openDrawer({
            componentName: 'affectLicense',
            props: {
              id: value?.Id,
              handleClose: closeDrawer,
              setPage
            }
          }
          )
        : null,
      className: TotalLicensesRemaining ? linkTextStyle : disabledLinkTextStyle,
      containerClassName: TotalLicensesRemaining ? linkContainer : disabledLinkContainer,
      color: TotalLicensesRemaining ? neutral[6] : neutral[5]
    },
    {
      text: Text.reinviteThisLearner,
      onHandleClick: () => value.LastConnectionDate === null ? dispatch(resendWelcomeMessageAction([value.Id], noDate)) : null,
      className: value.LastConnectionDate === null ? linkTextStyle : disabledLinkTextStyle,
      containerClassName: value.LastConnectionDate === null ? linkContainer : disabledLinkContainer,
      color: value.LastConnectionDate === null ? neutral[6] : neutral[5]
    },
    {
      text: Text.editTeam,
      onHandleClick: () => openDrawer(
        {
          componentName: 'editLearnerTeam',
          props: {
            id: value?.Id,
            handleClose: closeDrawer,
            setPage
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
            handleClose: closeDrawer,
            setPage
          }
        }
      ),
      color: red[3]
    }
  ]
  const managerPopOverContentMap = [
    {
      text: Text.reinviteThisLearner,
      onHandleClick: () => value.LastConnectionDate === null ? dispatch(resendWelcomeMessageAction([value.Id], noDate)) : null,
      className: value.LastConnectionDate === null ? linkTextStyle : disabledLinkTextStyle,
      containerClassName: value.LastConnectionDate === null ? linkContainer : disabledLinkContainer,
      color: value.LastConnectionDate === null ? neutral[6] : neutral[5]
    },
    {
      text: Text.askAccess,
      onHandleClick: () => dispatch(requestCoursesAccessAction(value.Id))
    }
  ]
  const formattedPopOverContentMap = value.LastConnectionDate !== null ? popOverContentMap.filter(e => e.text !== Text.reinviteThisLearner) : popOverContentMap
  const formattedManagerPopOverContentMap = value.LastConnectionDate !== null ? managerPopOverContentMap.filter(e => e.text !== Text.reinviteThisLearner) : managerPopOverContentMap
  return (
    <div className={endRowContainer}>
      <div className={avatarContainer}>
        {
          item
            ? (
                isExpired(item)
                  ? (
                    <TypographyElement
                      fontWeight={600}
                      fontSize='16px'
                      lineHeight='20px'
                      color={neutral[6]}
                    >
                      {Text.NV}
                    </TypographyElement>)
                  : (
                    <>
                      <div className={subTypeContainer}>
                        <TypographyElement
                          fontWeight={600}
                          fontSize='12px'
                          lineHeight='15px'
                          color={blue[0]}
                        >
                          {Text.licenseTypes[organizationLicenseTypes[value.OrganizationLicenseType]]}

                        </TypographyElement>
                      </div>
                      <TypographyElement
                        fontWeight={600}
                        fontSize='16px'
                        spacing='0px 0px 0px 8px'
                        lineHeight='20px'
                        color={neutral[6]}
                      >
                        {moment(item).format(DMYDateFormat)}
                      </TypographyElement>
                    </>))
            : (
                value.InvitationId
                  ? (
                    <TypographyElement
                      fontWeight={600}
                      fontSize='16px'
                      lineHeight='20px'
                      color={neutral[6]}
                    >
                      {
                      value.InvitationLicenseType && value.InvitationLicenseType !== OrganizationLicenseTypeEnum.None
                        ? Text.fullLicenseTypes[organizationLicenseTypes[value.InvitationLicenseType]]
                        : Text.NV
                    }
                    </TypographyElement>)
                  : (
                    <TypographyElement
                      fontWeight={600}
                      fontSize='16px'
                      lineHeight='20px'
                      color={neutral[6]}
                    >
                      {Text.NV}
                    </TypographyElement>)
              )
        }
      </div>
      <div className={cellContainer}>
        <Popover>
          <PopoverTrigger>
            <div className={dotsPopoverContainer} data-div='modal'>
              <span className={dot} data-div='modal' />
              <span className={dot} data-div='modal' />
              <span className={dot} data-div='modal' />
            </div>
          </PopoverTrigger>
          <PopoverContent topPosition={40}>
            {isManager
              ? (
                <div className={popOverContent} data-div='modal'>
                  {formattedManagerPopOverContentMap.map((item, index) => (
                    <div
                      key={index}
                      data-div='modal'
                      className={item.containerClassName || linkContainer}
                      onClick={(e) => {
                        dispatch(fetchLearnerProfileAction(value?.Id))
                        item.onHandleClick()
                      }}
                    >
                      <TypographyElement
                        key={index}
                        dataTest='modal'
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
                <div className={popOverContent} data-div='modal'>
                  {formattedPopOverContentMap.map((item, index) => (
                    <div
                      key={index}
                      data-div='modal'
                      className={item.containerClassName || linkContainer}
                      onClick={(e) => {
                        dispatch(fetchLearnerProfileAction(value?.Id))
                        item.onHandleClick()
                      }}
                    >
                      <TypographyElement
                        key={index}
                        color={item.color || neutral[6]}
                        fontWeight='normal'
                        dataTest='modal'
                        fontSize='13px'
                        lineHeight='16px'
                        className={item.className || linkTextStyle}
                      >
                        {item.text}
                      </TypographyElement>
                    </div>
                  ))}
                </div>)}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export const NameRow = ({ value }) => {
  const {
    avatarContainer
  } = useStyle()
  const { loading } = useSelector(state => state.config)

  const name = `${value.FirstName} ${value.LastName}`
  return (
    <div className={avatarContainer}>
      <Avatar
        loading={loading}
        key={loading}
        size='size_0'
        name={avatarName(name)}
        img={value.InvitationId ? `${amazonBucket.avatar}${Avatars.anonymous}` : value.photo ? `${amazonBucket.bucketBaseUrl}${value.photo}` : null}
        dot={value.InvitationId && !loading}
        dotColor={red[3]}
      />
      <TypographyElement
        fontWeight={600}
        fontSize='16px'
        lineHeight='20px'
        spacing='0px 0px 0px 8px'
        color={neutral[6]}
      >
        {value.InvitationId ? `${Text.userInvited} : ${value.InvitationEmail}` : name || ''}
      </TypographyElement>
    </div>
  )
}

export const TeamNameRow = ({ item }) => {
  return (
    <TypographyElement
      fontWeight={600}
      fontSize='16px'
      lineHeight='20px'
      color={neutral[6]}
    >
      {(item && item.length > 16 ? item.slice(0, 16 - 1) + '…' : item) || Text.noTeam}
    </TypographyElement>
  )
}

export const LastConnectionDateRow = ({ item }) => {
  return (
    <TypographyElement
      fontWeight={600}
      fontSize='16px'
      lineHeight='20px'
      color={neutral[6]}
    >
      {item ? moment(item).format(DMYDateFormat) : Text.never}
    </TypographyElement>
  )
}

export const CreationDateRow = ({ item }) => {
  return (
    <TypographyElement
      fontWeight={600}
      fontSize='16px'
      lineHeight='20px'
      color={neutral[6]}
    >
      {item ? moment(item).format(DMYDateFormat) : Text.noDate}
    </TypographyElement>
  )
}

export const InvitedLearnerRow = ({ item, learnerSide, turnOffLoaderWhenDone, learnerId, take }) => {
  const {
    tableRow,
    avatarContainer,
    dotsInvitedPopoverContainer,
    popOverContent,
    linkTextStyle,
    cellContainer,
    dot,
    linkContainer
  } = useStyle()
  const dispatch = useDispatch()
  const popOverContentMap = [
    {
      text: Text.deleteLearnerInvite,
      onHandleClick: () => {
        dispatch(cancelLearnerInvitationAction(item.InvitationId, learnerSide, turnOffLoaderWhenDone, take, learnerId))
        scrollUp()
      },
      color: red[3]
    }
  ]
  return (
    <tr
      className={tableRow}
    >
      <TableCell padding='default'>
        <div className={avatarContainer}>
          <Avatar
            size='size_0'
            img={`${amazonBucket.avatar}${Avatars.anonymous}`}
          />
          <TypographyElement
            fontWeight={600}
            fontSize='16px'
            lineHeight='20px'
            spacing='0px 0px 0px 8px'
            color={neutral[6]}
          >
            {`${Text.userInvited} : ${item.InvitationEmail}`}
          </TypographyElement>
        </div>
      </TableCell>
      <td className={cellContainer}>
        <Popover>
          <PopoverTrigger>
            <div className={dotsInvitedPopoverContainer}>
              <span className={dot} />
              <span className={dot} />
              <span className={dot} />
            </div>
          </PopoverTrigger>
          <PopoverContent topPosition={40}>
            <div className={popOverContent}>
              {popOverContentMap.map((item, index) => (
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
            </div>
          </PopoverContent>
        </Popover>
      </td>
    </tr>
  )
}
