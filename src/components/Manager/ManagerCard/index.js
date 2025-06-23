import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
import { Paper, TypographyElement, neutral, Icon, Icons, Avatar, AvatarSize, red, Skeleton } from '@pro_boa/ui'
import moment from 'moment'
import Text from './text.json'
import { avatarName } from 'helpers'
import { amazonBucket, DMYDateFormat, Avatars } from 'constants/'
import DeleteInvitationModal from 'components/Common/InviteBar/DeleteInvitationModal'
import { useDispatch, useSelector } from 'react-redux'
import { cancelLearnerInvitationAction } from 'pages/LearnerProfile/store'

const numberOfTeams = 3
const defaultHandleClick = () => { }
export default ({ handleClick = defaultHandleClick, Data = [], loading }) => {
  const useStyle = createUseStyles(style)
  const {
    row,
    card,
    icon,
    flex,
    avatarContainer,
    managerCard,
    noTeamMessageClass,
    nameContainer,
    avatarspaceSkeleton,
    spaceSekelton,
    iconSkeleton,
    deleteStyle,
    inviteStyle
  } = useStyle()
  const dispatch = useDispatch()
  const [openDeleteInvitationModal, setOpenDeleteInvitationModal] = useState(false)
  const { InvitationId } = useSelector(({ managers }) => managers?.invitedManager)

  const fullName = `${Data.FirstName} ${Data.LastName}`
  const teams = Data?.Teams
  const isInvited = Data?.InvitationId
  return (
    loading
      ? (
        <Paper className={row}>
          <div className={flex} onClick={handleClick}>
            <div className={nameContainer}>
              <div className={avatarContainer}>
                <Avatar
                  loading
                  size={AvatarSize.size_1}
                />
              </div>
              <span className={avatarspaceSkeleton} />
              <Skeleton lines={1} height={18} width={150} />
            </div>
            <div title={Text.creation} className={card}>
              <div className={iconSkeleton}>
                <Skeleton lines={1} height={18} width={18} />
                &nbsp;
              </div>
              <span className={spaceSekelton} />
              <Skeleton lines={1} height={18} width={75} />
            </div>
            <div title={Text.lastConnection} className={card}>
              <div className={iconSkeleton}>
                <Skeleton lines={1} height={18} width={18} />
                &nbsp;
              </div>
              <span className={spaceSekelton} />
              <Skeleton lines={1} height={18} width={100} />
            </div>
            <div title={Text.team} className={card}>
              <div className={iconSkeleton}>
                <Skeleton lines={1} height={18} width={18} />
                &nbsp;
              </div>
              <span className={spaceSekelton} />
              <Skeleton lines={1} height={18} width={81} />
            </div>
          </div>
        </Paper>
        )
      : (
        <>
          {
            isInvited
              ? (
                <Paper className={row}>
                  <div className={flex} onClick={handleClick}>
                    <div className={inviteStyle}>
                      <div className={flex}>
                        <div className={avatarContainer}>
                          <Avatar
                            dotTop={1}
                            name={avatarName(fullName)}
                            img={`${amazonBucket.avatar}${Avatars.anonymous}`}
                            size={AvatarSize.size_1}
                            dot
                            dotColor={red[3]}
                          />
                        </div>
                        <TypographyElement
                          component='h3'
                          variant='heading3'
                          align='left'
                          fontSize={16}
                          spacing='20px'
                          color={neutral[6]}
                        >
                          {Text.userInvited} {Data.InvitationEmail}
                        </TypographyElement>
                      </div>
                      <div>
                        <TypographyElement
                          color={red[3]}
                          spacing='0px 20px 0 20px'
                          cursor='pointer'
                          fontSize={12}
                          className={deleteStyle}
                          handleClick={() => setOpenDeleteInvitationModal(true)}
                        >
                          {Text.cancelInvitation}
                        </TypographyElement>
                      </div>
                    </div>
                  </div>
                  <DeleteInvitationModal
                    isManager
                    openModal={openDeleteInvitationModal}
                    handleClose={() => setOpenDeleteInvitationModal(false)}
                    handleSubmit={() => {
                      dispatch(cancelLearnerInvitationAction(InvitationId))
                      setOpenDeleteInvitationModal(false)
                    }}
                  />
                </Paper>
                )
              : (
                <Paper className={row}>
                  <div className={flex} onClick={handleClick}>
                    <div className={nameContainer}>
                      <div className={avatarContainer}>
                        <Avatar
                          name={avatarName(fullName)}
                          img={Data.Photo ? `${amazonBucket.bucketBaseUrl}${Data.Photo}` : null}
                          size={AvatarSize.size_1}
                        />
                      </div>
                      <TypographyElement
                        component='h3'
                        variant='heading3'
                        align='left'
                        fontSize={16}
                        spacing='20px'
                        color={neutral[6]}
                      >
                        {Data.FirstName || ''} {Data.LastName || ''}
                      </TypographyElement>
                    </div>
                    <div title={Text.creation} className={card}>
                      <Icon iconName={Icons.calendar} style={icon} />
                      <TypographyElement
                        component='h4'
                        variant='caption1'
                        align='left'
                        spacing='10px 16px 11px 16px'
                        color={neutral[4]}
                      >
                        {moment(Data.CreationDate).format(DMYDateFormat)}
                      </TypographyElement>
                    </div>
                    <div title={Text.lastConnection} className={card}>
                      <Icon iconName={Icons.lastUserLogin} style={icon} />
                      <TypographyElement
                        component='h4'
                        variant='caption1'
                        align='left'
                        spacing='10px 16px 11px 16px'
                        color={neutral[4]}
                      >
                        {Data.LastConnectionDate !== null
                          ? `${moment(Data.LastConnectionDate).format(DMYDateFormat)}`
                          : Text.neverConnected}
                      </TypographyElement>
                    </div>
                    <div title={Text.team} className={managerCard}>
                      {teams?.length
                        ? (
                          <>
                            <Icon iconName={Icons.teams} style={icon} />
                            <TypographyElement
                              component='h4'
                              variant='caption1'
                              align='left'
                              spacing='10px 5px 11px 16px'
                              color={neutral[4]}
                            >
                              {teams.map(team => team.Name.length > 15 ? `${team.Name.slice(0, 15)}...` : team.Name)
                                .slice(0, numberOfTeams).join(' - ')}
                              {teams.length > numberOfTeams && ' . . .'}
                            </TypographyElement>
                          </>
                          )
                        : (
                          <div title={Text.team} className={noTeamMessageClass}>
                            <Icon iconName={Icons.teams} style={icon} />
                            <TypographyElement
                              component='h4'
                              variant='caption1'
                              align='left'
                              spacing='10px 16px 11px 16px'
                              color={neutral[4]}
                            >
                              {Text.noTeamMessage}
                            </TypographyElement>
                          </div>
                          )}
                    </div>
                  </div>
                </Paper>
                )
          }
        </>
        ))
}
