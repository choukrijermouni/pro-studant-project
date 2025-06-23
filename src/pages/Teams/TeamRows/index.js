
import { createUseStyles } from 'react-jss'
import style from '../style'
import Text from '../text.json'
import {
  TypographyElement,
  neutral,
  red
} from '@pro_boa/ui'
import { useDispatch, useSelector } from 'react-redux'
import { teamDev } from 'assets'
import { Popover, PopoverContent, PopoverTrigger } from 'components/Common/PopOver'
import { fetchTeamAction } from 'pages/TeamDetails/store'
import { useDrawer } from 'components/Common/Drawer/drawerContext'

const useStyle = createUseStyles(style)

export const NameRow = ({ value }) => {
  const {
    avatarContainer,
    teamTag
  } = useStyle()
  return (
    <div className={avatarContainer}>
      <img src={value.Image || teamDev} alt='' className={teamTag} />
      <TypographyElement
        fontWeight={600}
        fontSize='16px'
        lineHeight='20px'
        spacing='0px 0px 0px 8px'
        color={neutral[6]}
      >
        {value.Name && value.Name.length > 16 ? value.Name.slice(0, 16 - 1) + '…' : value.Name}
      </TypographyElement>
    </div>
  )
}

export const TeamCountRow = ({ item }) => {
  return (
    <TypographyElement
      fontWeight={600}
      fontSize='16px'
      lineHeight='20px'
      color={neutral[6]}
    >
      {item}
    </TypographyElement>
  )
}

export const ManagersRow = ({ item, value }) => {
  const { loading } = useSelector(state => state.config)
  const {
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
  const { managersList: allManagers } = useSelector(state => state.teamDetails)
  const team = useSelector(state => state.teamDetails)
  const { openDrawer, closeDrawer } = useDrawer()
  const popOverContentMap = [
    {
      text: Text.editTeam,
      onHandleClick: () => openDrawer(
        {
          componentName: 'editTeam',
          props: {
            id: value?.Id,
            teamName: value?.Name,
            teamIcon: value?.Image,
            description: team?.Description,
            closeModal: closeDrawer
          }
        }
      )
    },
    {
      text: Text.assignManager,
      onHandleClick: () =>
        allManagers?.length && (item?.length !== allManagers?.length)
          ? openDrawer(
            {
              componentName: 'assignManager',
              props: {
                id: value?.Id,
                handleClose: closeDrawer
              }
            }
          )
          : null,
      className: allManagers?.length && (item?.length !== allManagers?.length) ? linkTextStyle : disabledLinkTextStyle,
      containerClassName: allManagers?.length && (item?.length !== allManagers?.length) ? linkContainer : disabledLinkContainer,
      color: allManagers?.length && (item?.length !== allManagers?.length) ? neutral[6] : neutral[2]
    },
    {
      text: Text.removeManager,
      onHandleClick: () =>
        item?.length
          ? openDrawer({
            componentName: 'removeManager',
            props: {
              id: value.Id,
              handleClose: closeDrawer
            }
          })
          : null,
      className: item?.length ? linkTextStyle : disabledLinkTextStyle,
      containerClassName: item?.length ? linkContainer : disabledLinkContainer,
      color: item?.length ? neutral[6] : neutral[2]
    },
    {
      text: Text.deleteTeam,
      onHandleClick: () => openDrawer({
        componentName: 'removeTeam',
        props: {
          team,
          handleClose: closeDrawer
        }
      }),
      color: red[3]
    }
  ]
  const { isManager } = useSelector(({ organizationProfile }) => organizationProfile)
  const dispatch = useDispatch()
  const formattedManagers = !loading && item?.map(manager => `${manager.FirstName} ${manager.LastName}`)
  return (
    <div className={endRowContainer}>
      <TypographyElement
        fontWeight={600}
        fontSize='16px'
        lineHeight='20px'
        color={neutral[6]}
      >
        {item.length
          ? formattedManagers?.slice(0, 3).join(', ')
          : Text.noManager}
        {formattedManagers?.length > 3 && '…'}
      </TypographyElement>
      {!isManager
        ? (
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
                <div className={popOverContent}>
                  {popOverContentMap.map((item, index) => (
                    <div
                      data-div='modal'
                      key={index}
                      className={item.containerClassName || linkContainer}
                      onClick={(e) => {
                        dispatch(fetchTeamAction(value.id))
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
                </div>
              </PopoverContent>
            </Popover>
          </div>)
        : null}
    </div>
  )
}
