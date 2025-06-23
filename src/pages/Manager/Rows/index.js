
import { createUseStyles } from 'react-jss'
import style from '../style'
import { amazonBucket, Avatars, DMYDateFormat } from 'constants/'
import Text from '../text.json'
import {
  TypographyElement,
  Avatar,
  neutral,
  red,
  TableCell
} from '@pro_boa/ui'
import { avatarName, scrollUp } from 'helpers'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { Popover, PopoverContent, PopoverTrigger } from 'components/Common/PopOver'
import { cancelLearnerInvitationAction } from 'pages/LearnerProfile/store'
import { useDrawer } from 'components/Common/Drawer/drawerContext'

const useStyle = createUseStyles(style)

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
        img={value.InvitationId ? `${amazonBucket.avatar}${Avatars.anonymous}` : value.Photo ? `${amazonBucket.bucketBaseUrl}${value.Photo}` : null}
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

export const TeamNameRow = ({ item, value, managerId }) => {
  const scale = window.devicePixelRatio
  const charLength = scale > 1 ? 6 : 15
  const managerTeams = useSelector(({ manager }) => manager?.Teams !== null ? manager.Teams : [])
  const managerHasTeams = managerTeams?.length > 0
  const {
    flex,
    dotsPopoverContainer,
    popOverContent,
    linkTextStyle,
    cellContainer,
    dot,
    teamStyle,
    linkContainer
  } = useStyle()
  const { openDrawer, closeDrawer } = useDrawer()
  const teams = `${item?.map(team => team.Name.length > 15
    ? `${team.Name.slice(0, charLength)}...`
    : team.Name).slice(0, 3).join(', ')} ${item?.length > 3 && '...'}`
  const popOverContentMap = [
    {
      text: Text.removeManager,
      onHandleClick: () => openDrawer(
        {
          componentName: 'deleteManager',
          props: {
            FirstName: value.FirstName,
            LastName: value.LastName,
            teams,
            managerId,
            managerHasTeams,
            handleClose: closeDrawer
          }
        }
      ),
      color: red[3]
    }
  ]

  return (
    <>
      <div className={flex}>
        <TypographyElement
          fontWeight={600}
          fontSize='16px'
          lineHeight='20px'
          color={neutral[6]}
          className={teamStyle}
        >
          {item?.map(team => team.Name.length > 15 ? `${team.Name.slice(0, charLength)}...` : team.Name)
            .slice(0, 3).join(', ')}
          {item?.length > 3 && '...'}
        </TypographyElement>
        <div className={cellContainer}>
          <Popover>
            <PopoverTrigger>
              <div className={dotsPopoverContainer}>
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
        </div>
      </div>
    </>
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

export const InvitedManagerRow = ({ item, turnOffLoaderWhenDone, managerId, take }) => {
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
      text: Text.deleteManager,
      onHandleClick: () => {
        dispatch(cancelLearnerInvitationAction(item.InvitationId, turnOffLoaderWhenDone, take, managerId))
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
