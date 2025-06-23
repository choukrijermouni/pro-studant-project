import Text from '../text.json'
import style from './style'
import { createUseStyles } from 'react-jss'
import { monthlyLicenseType, annualLicenseType } from 'constants/'
import LicensceSelectItem from '../LicensceSelectItem'
import {
  TypographyElement
} from '@pro_boa/ui'

const useStyle = createUseStyles(style)

export default ({ selectedLicense, setSelectedLicense }) => {
  const {
    licenseSelectContainer
  } = useStyle()
  return (
    <div>
      <div>
        <TypographyElement
          fontSize='12px'
          spacing='20px 0 4px'
          variant='body1'
        >
          {Text.licenseType}
        </TypographyElement>
      </div>

      <div className={licenseSelectContainer}>
        <LicensceSelectItem
          selected={selectedLicense === annualLicenseType}
          info={Text.fullLicenseTypes.Annual}
          handleClick={() => setSelectedLicense(annualLicenseType)}
        />
        <LicensceSelectItem
          selected={selectedLicense === monthlyLicenseType}
          info={Text.fullLicenseTypes.Monthly}
          handleClick={() => setSelectedLicense(monthlyLicenseType)}
        />
      </div>
    </div>
  )
}
