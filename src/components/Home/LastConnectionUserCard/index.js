import React from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
import { Paper, Icon, Icons, TypographyElement, neutral, AvatarSize, Avatar, Skeleton } from '@pro_boa/ui'
import moment from 'moment'
import { DMYDateFormat, amazonBucket } from 'constants/'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { LearnerProfileNeutralPath } from 'Routes'
import Text from './text.json'
import { avatarName } from 'helpers'

export default ({ data, manager = false, loading }) => {
  const dispatch = useDispatch()
  const useStyle = createUseStyles(style)
  const fullName = `${data?.FirstName} ${data?.LastName}`
  const { row, nameContainer, icon, card, nameBox, cardContainer, avatarContainer } = useStyle({ manager })
  return (
    <div
      data-test='card-last-connection'
      className={cardContainer}
      onClick={() => !manager && dispatch(push(`${LearnerProfileNeutralPath}/${data?.Id}`))}
    >
      <Paper className={row}>
        <div className={nameContainer}>
          <div className={avatarContainer}>
            <Avatar
              name={avatarName(fullName)}
              img={data?.Photo ? `${amazonBucket.bucketBaseUrl}${data?.Photo}` : null}
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
                  className={nameBox}
                >
                  {`${data?.FirstName || ''} ${data?.LastName || ''}`}
                </TypographyElement>
                )
          }

        </div>
        <div title={Text.lastConnection} className={card}>
          {
            loading
              ? <Skeleton lines={1} height={20} width={160} />
              : (
                <>
                  <Icon iconName={Icons.lastUserLogin} style={icon} />
                  <TypographyElement
                    component='h4'
                    variant='caption1'
                    align='left'
                    spacing='10px 16px 11px 16px'
                    color={neutral[4]}
                  >
                    {(data?.LastConnectionDate ? moment(data?.LastConnectionDate).format(DMYDateFormat) : Text.neverConnected)}
                  </TypographyElement>
                </>
                )
          }

        </div>
      </Paper>
    </div>
  )
}
