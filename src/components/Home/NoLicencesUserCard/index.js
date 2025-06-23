import React from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
import { Paper, Button, TypographyElement, neutral, Avatar, AvatarSize, Skeleton } from '@pro_boa/ui'
import Text from './text.json'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { LearnerProfileNeutralPath } from 'Routes'
import { amazonBucket } from 'constants/'
import { avatarName } from 'helpers'

export default ({ Data, loading }) => {
  const dispatch = useDispatch()
  const useStyle = createUseStyles(style)
  const fullName = `${Data?.FirstName} ${Data?.LastName}`
  const { cardContainer, row, nameContainer, avatarContainer } = useStyle()
  return (
    <div
      data-test='no-licence-user-card'
      className={cardContainer}
      onClick={() => dispatch(push(`${LearnerProfileNeutralPath}/${Data?.Id}`))}
    >
      <Paper className={row}>
        <div className={nameContainer}>
          <div className={avatarContainer}>
            <Avatar
              name={avatarName(fullName)}
              img={Data?.Photo ? `${amazonBucket.bucketBaseUrl}${Data?.Photo}` : null}
              size={AvatarSize.size_1}
              key={loading}
              loading={loading}
            />
          </div>
          {
            loading
              ? <Skeleton lines={1} height={20} width='70%' margin='20px' />
              : (
                <TypographyElement
                  component='h3'
                  variant='heading3'
                  align='left'
                  fontSize={13}
                  spacing='20px'
                  color={neutral[6]}
                >
                  {`${Data?.FirstName || ''} ${Data?.LastName || ''}`}
                </TypographyElement>
                )
          }
        </div>
        {
          loading
            ? <Skeleton lines={1} height={40} width={180} />
            : <Button
                dataTest='no-licence-user-card-button'
                size='small'
                width='180px'
                height='40px'
                label={Text.affect}
              />
        }
      </Paper>
    </div>
  )
}
