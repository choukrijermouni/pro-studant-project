import React from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
import { Paper, AvatarSize, Avatar, TypographyElement, neutral, red } from '@pro_boa/ui'
import { amazonBucket, Avatars } from 'constants/'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { InvitedProfilePath } from 'Routes'
import Text from './text.json'
import { avatarName } from 'helpers'
import { fetchInvitedLearnerInfosAction } from 'pages/Learners/store'

export default ({ data }) => {
  const dispatch = useDispatch()
  const useStyle = createUseStyles(style)
  const { row, nameContainer, cardContainer, avatarContainer } = useStyle()
  const fullName = `${data?.FirstName} ${data?.LastName}`
  return (
    <div
      data-test='invited-user-card'
      className={cardContainer}
      onClick={() => {
        dispatch(fetchInvitedLearnerInfosAction(data))
        dispatch(push(InvitedProfilePath))
      }}
    >
      <Paper className={row}>
        <div className={nameContainer}>
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
            fontSize={13}
            spacing='20px'
            color={neutral[6]}
          >
            {`${Text?.invited} : ${data?.InvitationEmail} `}
          </TypographyElement>
        </div>
      </Paper>
    </div>
  )
}
