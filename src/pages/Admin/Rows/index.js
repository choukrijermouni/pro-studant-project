
import { createUseStyles } from 'react-jss'
import style from '../style'
import { AdminRole, Avatars, amazonBucket, DMYDateFormat } from 'constants/'
import Text from '../text.json'
import {
  TypographyElement,
  Avatar,
  neutral,
  red,
  TableCell
} from '@pro_boa/ui'
import { avatarName, notValidDate, scrollUp } from 'helpers'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { Popover, PopoverContent, PopoverTrigger } from 'components/Common/PopOver'
import { useDrawer } from 'components/Common/Drawer/drawerContext'
import { cancelAdminInvitationAction } from '../store'

const useStyle = createUseStyles(style)

export const NameRow = ({ value }) => {
  const {
    avatarContainer,
    fontStyle
  } = useStyle()
  const { loading } = useSelector(state => state.config)
  const name = `${value.FirstName} ${value.LastName}`
  return (
    <div className={avatarContainer}>
      <div className={fontStyle}>
        <div className={avatarContainer}>
          <Avatar
            loading={loading}
            key={loading}
            img={value?.Photo
              ? `${amazonBucket.bucketBaseUrl}${value?.Photo}`
              : null}
            name={avatarName(name)}
            size='size_0'
          />
        </div>
        <TypographyElement
          fontWeight={600}
          fontSize='16px'
          lineHeight='20px'
          spacing='0px 0px 0px 8px'
          color={neutral[6]}
        >
          {name}
        </TypographyElement>
      </div>
    </div>
  )
}

export const EmailRow = ({ value, FirstAdmin }) => {
  const {
    flex,
    dotsPopoverContainer,
    popOverContent,
    linkTextStyle,
    cellContainer,
    dot,
    linkContainer
  } = useStyle()
  const { openDrawer, closeDrawer } = useDrawer()
  const { user } = useSelector(({ identity }) => identity)
  const isAdmin = user?.role?.includes(AdminRole)
  const showPopOver = isAdmin && value.Id !== user?.Id && value?.Id !== FirstAdmin?.Id
  const popOverContentMap = [
    {
      text: Text.removeAdmin,
      onHandleClick: () => openDrawer(
        {
          componentName: 'removeAdmin',
          props: {
            adminId: value.Id,
            handleClose: closeDrawer
          }
        }
      ),
      color: red[3]
    }
  ]
  return (
    <div className={flex}>
      <TypographyElement
        fontWeight={600}
        fontSize='16px'
        lineHeight='20px'
        color={neutral[6]}
      >
        {value.Email || ''}
      </TypographyElement>
      {showPopOver
        ? (
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
          </div>)
        : null}
    </div>
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
      {item && !notValidDate(item) ? moment(item).format(DMYDateFormat) : Text.never}
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

export const InvitedAdminRow = ({ item }) => {
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
      text: Text.deleteAdmin,
      onHandleClick: () => {
        dispatch(cancelAdminInvitationAction(item.InvitationId))
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
