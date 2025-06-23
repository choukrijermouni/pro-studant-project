import { createUseStyles } from 'react-jss'
import Layout from 'components/Common/Layout'
import GoBackAction from 'components/Common/GoBackAction'
import style from './style'
import { useDispatch, useSelector } from 'react-redux'
import { push, goBack } from 'connected-react-router'
import { TeamDetailsNeutralPath } from 'Routes'
import { amazonBucket, Avatars, teams } from 'constants/'
import { useEffect, useState } from 'react'
import {
  Avatar,
  TypographyElement,
  neutral,
  AvatarSize,
  red,
  Icons,
  Icon
} from '@pro_boa/ui'
import Text from './text.json'
import { cancelLearnerInvitationAction } from 'pages/LearnerProfile/store'
import DeleteInvitationModal from 'components/Common/InviteBar/DeleteInvitationModal'

const useStyle = createUseStyles(style)

const defaultTeamImageIndex = 0

export default () => {
  const {
    header,
    rightContent,
    card,
    teamIcon,
    icon,
    actionContainer
  } = useStyle()
  const dispatch = useDispatch()
  const managerTeams = useSelector(({ managers }) => managers.invitedManager?.Teams)
  const { InvitationId, InvitationEmail } = useSelector(({ managers }) => managers?.invitedManager)
  const [openDeleteInvitationModal, setOpenDeleteInvitationModal] = useState(false)
  useEffect(() => {
    if (!InvitationId || !InvitationEmail) {
      dispatch(goBack())
    }
  }, [InvitationId, InvitationEmail])
  const ManagerTeam = managerTeams?.length ? managerTeams[0] : null
  return (
    <Layout>
      <GoBackAction />
      <div className={header}>
        <Avatar
          size={AvatarSize.size_4}
          img={`${amazonBucket.avatar}${Avatars.anonymous}`}
          dot
          dotColor={red[3]}
          dotWidth={20}
          dotHeight={20}
          dotTop={8}
          dotRight={8}
        />
        <div className={rightContent}>
          <TypographyElement
            component='h5'
            variant='heading3'
            align='left'
            fontSize='24px'
            spacing='0 10px 30px 0'
            color={neutral[6]}
          >
            {InvitationEmail}
          </TypographyElement>
          <div
            className={card}
            onClick={() => ManagerTeam?.Id && dispatch(push(`${TeamDetailsNeutralPath}/${ManagerTeam?.Id}`))}
          >
            <img src={ManagerTeam?.Image || teams[defaultTeamImageIndex]} alt='team' className={teamIcon} />
            <TypographyElement
              component='h4'
              variant='caption1'
              align='left'
              spacing='10px 16px 11px 16px'
              color={neutral[5]}
            >
              {Text.team}{ManagerTeam?.Name}
            </TypographyElement>
            <Icon iconName={Icons.teams} style={icon} />
          </div>
        </div>
      </div>
      <div className={actionContainer}>
        <TypographyElement
          color={red[3]}
          align='center'
          spacing='0px 20px 0 20px'
          display='inline'
          cursor='pointer'
          handleClick={() => setOpenDeleteInvitationModal(true)}
        >
          {Text.cancelInvitation}
        </TypographyElement>
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
    </Layout>
  )
}
