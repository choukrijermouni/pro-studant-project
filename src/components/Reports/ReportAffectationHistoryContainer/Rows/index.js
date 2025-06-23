
import { createUseStyles } from 'react-jss'
import style from '../style'
import { amazonBucket, DMYDateFormat } from 'constants/'
import Text from '../text.json'
import {
  TypographyElement,
  blue,
  Avatar,
  neutral,
  red
} from '@pro_boa/ui'
import { avatarName } from 'helpers'
import moment from 'moment'
import { useSelector } from 'react-redux'

const useStyle = createUseStyles(style)

export const OrganizationLicenseTypeRow = ({ organizationLicenseTypes, value }) => {
  const {
    subTypeContainer,
    avatarContainer
  } = useStyle()
  return (
    <div className={avatarContainer}>
      <>
        <div className={subTypeContainer}>
          <TypographyElement
            fontWeight={600}
            fontSize='12px'
            lineHeight='15px'
            color={blue[0]}
          >
            {Text.licenseTypes[organizationLicenseTypes[value.OrganizationLicenseType]]}

          </TypographyElement>
        </div>
        <TypographyElement
          fontWeight={600}
          fontSize='16px'
          spacing='0px 0px 0px 8px'
          lineHeight='20px'
          color={neutral[6]}
        >
          {value.QuantityAssigned}
        </TypographyElement>
      </>
    </div>
  )
}

export const NameRow = ({ value }) => {
  const {
    avatarContainer
  } = useStyle()
  const { loading } = useSelector(state => state.config)

  const name = `${value.FirstName} ${value.LastName}`
  return (
    <div className={avatarContainer}>
      <Avatar
        loading={loading}
        key={loading}
        size='size_0'
        name={avatarName(name)}
        img={value.Photo ? `${amazonBucket.bucketBaseUrl}${value.Photo}` : null}
        dot={value.InvitationId && !loading}
        dotColor={red[3]}
      />
      <TypographyElement
        fontWeight={600}
        fontSize='16px'
        lineHeight='20px'
        spacing='0px 0px 0px 8px'
        color={neutral[6]}
      >
        {name || ''}
      </TypographyElement>
    </div>
  )
}

export const AdminNameRow = ({ item }) => {
  return (
    <TypographyElement
      fontWeight={600}
      fontSize='16px'
      lineHeight='20px'
      color={neutral[6]}
    >
      {item || Text.noTeam}
    </TypographyElement>
  )
}

export const LastConnectionDateRow = ({ item }) => {
  return (
    <TypographyElement
      fontWeight={600}
      fontSize='16px'
      lineHeight='20px'
      color={neutral[6]}
    >
      {item ? moment(item).format(DMYDateFormat) : Text.never}
    </TypographyElement>
  )
}

export const OperationDateRow = ({ item }) => {
  return (
    <TypographyElement
      fontWeight={600}
      fontSize='16px'
      lineHeight='20px'
      color={neutral[6]}
    >
      {item ? moment(item).format(DMYDateFormat) : Text.noDate}
    </TypographyElement>
  )
}
