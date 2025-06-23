import Text from './text.json'
import { createUseStyles } from 'react-jss'
import style from './style'
import {
  Paper,
  TypographyElement,
  neutral,
  Icon,
  Icons,
  Skeleton
} from '@pro_boa/ui'
import SmallAvatarWithDot from 'components/Common/SmallAvatarWithDot'
import moment from 'moment'
import { DMYDateFormat, amazonBucket } from 'constants/'
import { useSelector } from 'react-redux'

export default ({ photo, name, date, adminName, license, handleClick, quantityAssigned, loading }) => {
  const useStyle = createUseStyles(style)
  const { row, card, icon, flex, fontStyle, avatarContainer } = useStyle()
  const { organizationLicenseTypes } = useSelector(state => state.referential)
  return (
    <Paper className={row}>
      <div className={flex} onClick={handleClick} data-test='learner-card'>
        <div className={avatarContainer}>
          <SmallAvatarWithDot
            name={name}
            image={photo ? `${amazonBucket.bucketBaseUrl}${photo}` : null}
            size='size_1'
            key={loading}
            loading={loading}
          />
        </div>
        <div className={fontStyle}>
          {
            loading
              ? <Skeleton lines={1} height={30} margin='20px' width='80%' />
              : (
                <TypographyElement
                  component='h3'
                  variant='heading3'
                  align='left'
                  fontSize={16}
                  spacing='20px'
                  color={neutral[6]}
                >
                  {name || ''}
                </TypographyElement>
                )
          }

        </div>
        <div title={Text.affectationDate} className={card}>
          {
            loading
              ? <Skeleton lines={1} height={20} margin='10px 16px 11px 16px' width='80%' />
              : (
                <>
                  <Icon iconName={Icons.clock} style={icon} />
                  <TypographyElement
                    component='h4'
                    variant='caption1'
                    align='left'
                    spacing='10px 16px 11px 16px'
                    color={neutral[4]}
                  >
                    {moment(date).format(DMYDateFormat)}
                  </TypographyElement>
                </>
                )
          }

        </div>
        <div title={Text.whoDidAffectation} className={card}>
          {
            loading
              ? <Skeleton lines={1} height={20} margin='10px 16px 11px 16px' width='80%' />
              : (
                <>
                  <Icon iconName={Icons.admin} style={icon} />
                  <TypographyElement
                    component='h4'
                    variant='caption1'
                    align='left'
                    spacing='10px 16px 11px 16px'
                    color={neutral[4]}
                  >
                    {adminName || Text.NV}
                  </TypographyElement>
                </>
                )
          }
        </div>
        <div title={Text.License} className={card}>
          {
            loading
              ? <Skeleton lines={1} height={20} margin='10px 16px 11px 16px' width='80%' />
              : (
                <>
                  <Icon iconName={Icons.licenses} style={icon} />
                  <TypographyElement
                    component='h4'
                    variant='caption1'
                    align='left'
                    spacing='10px 16px 11px 16px'
                    color={neutral[4]}
                  >
                    {license ? `${Text.licenseTypes[organizationLicenseTypes[license]]} (${quantityAssigned})` : Text.NV}
                  </TypographyElement>
                </>
                )
          }

        </div>
      </div>
    </Paper>
  )
}
