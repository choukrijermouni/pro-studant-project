import React from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
import { Paper, TypographyElement, Avatar, neutral, Icon, Icons, red, Skeleton } from '@pro_boa/ui'
import Text from './text.json'
import moment from 'moment'
import { amazonBucket, Avatars, DMYDateFormat, OrganizationLicenseTypeEnum } from 'constants/'
import { avatarName, isExpired } from 'helpers'

export default ({ name, photo, date, lastConnection, expireDate, handleClick, invited, invitationEmail, invitationLicenseType, organizationLicenseType, loading }) => {
  const scale = window.devicePixelRatio
  const useStyle = createUseStyles(style)
  const {
    row,
    card,
    icon,
    flex,
    avatarContainer,
    licenseCard,
    nameContainer,
    skeletonContainer
  } = useStyle({ invited, scale, loading })
  return (
    <div
      className={flex}
      onClick={handleClick}
      data-test={invited ? 'invited-user-card' : 'learner-card'}
    >
      <Paper className={row}>
        <div className={nameContainer}>
          <div className={avatarContainer}>
            <Avatar
              loading={loading}
              key={loading}
              size='size_1'
              name={avatarName(name)}
              img={invited ? `${amazonBucket.avatar}${Avatars.anonymous}` : photo ? `${amazonBucket.bucketBaseUrl}${photo}` : null}
              dot={invited && !loading}
              dotColor={red[3]}
            />
          </div>
          {
            loading
              ? <Skeleton lines={1} height={20} margin='0px 0px 0px 20px' width={170} />
              : (
                <TypographyElement
                  component='h3'
                  variant='heading3'
                  align='left'
                  fontSize={16}
                  spacing='0px 0px 0px 20px'
                  color={neutral[6]}
                >
                  {invited ? `${Text.userInvited} : ${invitationEmail}` : name || ''}
                </TypographyElement>)

          }
        </div>

        {
          invited && (
            loading
              ? null
              : (
                <div className={licenseCard} title={Text.subscriptionExpirationDate}>
                  <Icon iconName={Icons.licenses} style={icon} />
                  <TypographyElement
                    component='h4'
                    variant='caption1'
                    align='left'
                    spacing='10px 16px 11px 16px'
                    color={neutral[4]}
                  >
                    {
                  invitationLicenseType && invitationLicenseType !== OrganizationLicenseTypeEnum.None
                    ? Text.licenseTypes[invitationLicenseType]
                    : Text.NV
                }
                  </TypographyElement>
                </div>
                )
          )
        }
        {
          !invited
            ? (
              <>
                <div className={card} title={Text.creationDate}>
                  {
                    loading
                      ? <Skeleton lines={1} height={20} margin='10px 16px 11px 16px' width={170} />
                      : (
                        <>
                          <Icon iconName={Icons.calendar} style={icon} />
                          <TypographyElement
                            component='h4'
                            variant='caption1'
                            align='left'
                            spacing='0px 0px 0px 20px'
                            color={neutral[4]}
                          >
                            {date ? moment(date).format(DMYDateFormat) : Text.noDate}
                          </TypographyElement>
                        </>
                        )
                    }
                </div>
                <div className={card} title={Text.lastConnectionDate}>
                  {
                    loading
                      ? <Skeleton lines={1} height={20} margin='0px 0px 0px 20px' width={170} />
                      : (
                        <>
                          <Icon iconName={Icons.lastUserLogin} style={icon} />
                          <TypographyElement
                            component='h4'
                            variant='caption1'
                            align='left'
                            spacing='0px 0px 0px 20px'
                            color={neutral[4]}
                          >
                            {lastConnection ? moment(lastConnection).format(DMYDateFormat) : Text.never}
                          </TypographyElement>
                        </>
                        )
                    }
                </div>

                <div className={licenseCard} title={Text.subscriptionExpirationDate}>
                  {
                    loading
                      ? <div className={skeletonContainer}><Skeleton lines={1} height={20} margin='10px 16px 11px 16px' width={300} /></div>
                      : (
                        <>
                          <Icon iconName={Icons.licenses} style={icon} />
                          <TypographyElement
                            component='h4'
                            variant='caption1'
                            align='left'
                            spacing='0px 0px 0px 20px'
                            color={neutral[4]}
                          >
                            {
                          expireDate
                            ? isExpired(expireDate)
                                ? Text.NV
                                : `${Text.licenseTypes[organizationLicenseType]} ${Text.expire}${moment(expireDate).format(DMYDateFormat)}`
                            : Text.NV
                        }
                          </TypographyElement>
                        </>
                        )
                }
                </div>
              </>
              )
            : loading && (
              <>
                <div className={card} title={Text.creationDate}>
                  <Skeleton lines={1} height={20} margin='10px 16px 11px 16px' width={170} />
                </div>
                <div className={card} title={Text.lastConnectionDate}>
                  <Skeleton lines={1} height={20} margin='0px 0px 0px 20px' width={170} />
                </div>

                <div className={licenseCard} title={Text.subscriptionExpirationDate}>
                  <div className={skeletonContainer}><Skeleton lines={1} height={20} margin='10px 16px 11px 16px' width={300} /></div>
                </div>
              </>
            )
        }
      </Paper>
    </div>
  )
}
