import React from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
import { Paper, AvatarSize, Avatar, Icon, Icons, TypographyElement, neutral } from '@pro_boa/ui'
import moment from 'moment'
import { DMYDateFormat, amazonBucket } from 'constants/'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { LearnerProfileNeutralPath } from 'Routes'
import { avatarName } from 'helpers'
import Text from './text.json'

export default ({ data, license }) => {
  const dispatch = useDispatch()
  const useStyle = createUseStyles(style)
  const fullName = `${data?.FirstName} ${data?.LastName}`
  const { row, nameContainer, icon, card, nameBox, cardContainer, avatarContainer } = useStyle()
  const { organizationLicenseTypes } = useSelector(state => state.referential)
  return (
    <div
      data-test='last-assign-user-card'
      className={cardContainer}
      onClick={() => dispatch(push(`${LearnerProfileNeutralPath}/${data?.UserId}`))}
    >
      <Paper className={row}>
        <div className={nameContainer}>
          <div className={avatarContainer}>
            <Avatar
              name={avatarName(fullName)}
              img={data.Photo ? `${amazonBucket.bucketBaseUrl}${data.Photo}` : null}
              size={AvatarSize.size_1}
            />
          </div>
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
        </div>
        <div title={Text.lastAffectation} className={card}>
          <Icon iconName={Icons.lastUserLogin} style={icon} />
          <TypographyElement
            component='h4'
            variant='caption1'
            align='left'
            spacing='10px 16px 11px 16px'
            color={neutral[4]}
          >
            {moment(data?.OperationDate).format(DMYDateFormat)}
          </TypographyElement>
        </div>
        <Avatar
          name={organizationLicenseTypes[data?.OrganizationLicenseType]?.charAt(0)?.toUpperCase()}
          size={AvatarSize.size_1}
        />
      </Paper>
    </div>
  )
}
