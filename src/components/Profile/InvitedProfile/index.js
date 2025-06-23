import GoBackAction from 'components/Common/GoBackAction'
import Layout from 'components/Common/Layout'
import { useDispatch, useSelector } from 'react-redux'
import {
  Avatar,
  TypographyElement,
  neutral,
  AvatarSize,
  red,
  Icon,
  Icons
} from '@pro_boa/ui'
import { amazonBucket, Avatars, teams } from 'constants/'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { cancelLearnerInvitationAction } from 'pages/LearnerProfile/store'
import DeleteInvitationModal from 'components/Common/InviteBar/DeleteInvitationModal'
import { useEffect, useState } from 'react'
import { goBack, push } from 'connected-react-router'
import { TeamDetailsNeutralPath } from 'Routes'
import classNames from 'classnames'

const useStyles = createUseStyles(style)

const defaultTeamImageIndex = 0

export default () => {
  const dispatch = useDispatch()
  const { InvitationId, InvitationEmail, TeamId, TeamImage, TeamName, InvitationLicenseType } = useSelector(({ learners }) => learners?.invitedLearner)
  const { organizationLicenseTypes = {} } = useSelector(({ referential }) => referential)
  const { header, actionContainer, teamIcon, icon, card, cursor } = useStyles()
  const [openDeleteInvitationModal, setOpenDeleteInvitationModal] = useState(false)
  useEffect(() => {
    if (!InvitationId || !InvitationEmail) {
      dispatch(goBack())
    }
  }, [InvitationId, InvitationEmail])
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
        <div>
          <TypographyElement
            component='h3'
            variant='heading3'
            align='left'
            fontSize='30px'
            spacing='20px 10px 30px 20px'
            color={neutral[6]}
          >
            {InvitationEmail}
          </TypographyElement>
          <div className={header}>
            <div
              className={classNames(card, cursor)}
              onClick={() => TeamId && dispatch(push(`${TeamDetailsNeutralPath}/${TeamId}`))}
            >
              <img src={TeamImage || teams[defaultTeamImageIndex]} alt='team' className={teamIcon} />
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
            <div className={card}>
              <Avatar name={InvitationLicenseType ? organizationLicenseTypes[InvitationLicenseType]?.charAt(0) : 'S'} size={AvatarSize.size_0} />
              <TypographyElement
                component='h4'
                variant='caption1'
                align='left'
                spacing='10px 16px 11px 16px'
                color={neutral[5]}
              >
                {InvitationLicenseType ? `${Text.license} ${Text.licenseTypes[organizationLicenseTypes[InvitationLicenseType]]}` : Text.withoutLicense}
              </TypographyElement>
            </div>
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
