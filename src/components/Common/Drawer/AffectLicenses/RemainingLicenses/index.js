import {
  TypographyElement,
  green,
  blue,
  neutral,
  red
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from '../text.json'
import { annualLicenseType, monthlyLicenseType, trialLicenseType } from 'constants/'

const useStyle = createUseStyles(style)

export default ({ OrganizationLicenseDetails, TotalLicensesRemaining }) => {
  const LicenseDetails = (licenseType) => OrganizationLicenseDetails?.find(license => license?.OrganizationLicenseType === licenseType)
  const hideLicensesContainer = !LicenseDetails(annualLicenseType)?.LicenseTypeRemaining && !LicenseDetails(monthlyLicenseType)?.LicenseTypeRemaining && !LicenseDetails(trialLicenseType)?.LicenseTypeRemaining
  const {
    totalLicencesContainer,
    licensesLeftContainer,
    licenseTypesContainer,
    subTypeContainer,
    remainingLicensesContainer
  } = useStyle({ hideLicensesContainer })
  return (
    <div className={licensesLeftContainer}>
      <div className={totalLicencesContainer}>
        <TypographyElement
          fontWeight={300}
          fontSize='20px'
          lineHeight='25px'
          color={hideLicensesContainer ? red[3] : green[2]}
        >
          {TotalLicensesRemaining}
        </TypographyElement>
      </div>
      <div className={remainingLicensesContainer}>
        <TypographyElement
          fontWeight={600}
          fontSize='16px'
          lineHeight='20px'
          spacing='0 0 8px 0'
        >
          {Text.licensesLeft}
        </TypographyElement>
        <div className={licenseTypesContainer}>
          {LicenseDetails(annualLicenseType)?.LicenseTypeRemaining
            ? (
              <>
                <div title={Text.licenseTypeNames.Annual} className={subTypeContainer}>
                  <TypographyElement
                    fontWeight={600}
                    fontSize='12px'
                    lineHeight='15px'
                    color={blue[0]}
                  >
                    {Text.licenseTypes.Annual}
                  </TypographyElement>
                </div>
                <TypographyElement
                  fontWeight={300}
                  fontSize='14px'
                  lineHeight='18px'
                  spacing='0 8px 0 8px'
                  color={neutral[5]}
                >
                  ({LicenseDetails(annualLicenseType)?.LicenseTypeRemaining})
                </TypographyElement>
              </>)
            : hideLicensesContainer
              ? (
                <>
                  <div title={Text.licenseTypeNames.Annual} className={subTypeContainer}>
                    <TypographyElement
                      fontWeight={600}
                      fontSize='12px'
                      lineHeight='15px'
                      color={blue[0]}
                    >
                      {Text.licenseTypes.Annual}
                    </TypographyElement>
                  </div>
                  <TypographyElement
                    fontWeight={300}
                    fontSize='14px'
                    lineHeight='18px'
                    spacing='0 8px 0 8px'
                    color={neutral[5]}
                  >
                    0
                  </TypographyElement>
                </>)
              : null}
          {LicenseDetails(monthlyLicenseType)?.LicenseTypeRemaining
            ? (
              <>
                <div title={Text.licenseTypeNames.Monthly} className={subTypeContainer}>
                  <TypographyElement
                    fontWeight={600}
                    fontSize='12px'
                    lineHeight='15px'
                    color={blue[0]}
                  >
                    {Text.licenseTypes.Monthly}
                  </TypographyElement>
                </div>
                <TypographyElement
                  fontWeight={300}
                  fontSize='14px'
                  lineHeight='18px'
                  spacing='0 8px 0 8px'
                  color={neutral[5]}
                >
                  ({LicenseDetails(monthlyLicenseType)?.LicenseTypeRemaining})
                </TypographyElement>
              </>)
            : hideLicensesContainer
              ? (
                <>
                  <div title={Text.licenseTypeNames.Monthly} className={subTypeContainer}>
                    <TypographyElement
                      fontWeight={600}
                      fontSize='12px'
                      lineHeight='15px'
                      color={blue[0]}
                    >
                      {Text.licenseTypes.Monthly}
                    </TypographyElement>
                  </div>
                  <TypographyElement
                    fontWeight={300}
                    fontSize='14px'
                    lineHeight='18px'
                    spacing='0 8px 0 8px'
                    color={neutral[5]}
                  >
                    0
                  </TypographyElement>
                </>)
              : null}
          {LicenseDetails(trialLicenseType)?.LicenseTypeRemaining && !LicenseDetails(monthlyLicenseType)?.LicenseTypeRemaining && !LicenseDetails(annualLicenseType)?.LicenseTypeRemaining
            ? (
              <>
                <div title={Text.licenseTypeNames.Trial} className={subTypeContainer}>
                  <TypographyElement
                    fontWeight={600}
                    fontSize='12px'
                    lineHeight='15px'
                    color={blue[0]}
                  >
                    {Text.licenseTypes.Trial}
                  </TypographyElement>
                </div>
                <TypographyElement
                  fontWeight={300}
                  fontSize='14px'
                  lineHeight='18px'
                  spacing='0 0 0 8px'
                  color={neutral[5]}
                >
                  ({LicenseDetails(trialLicenseType)?.LicenseTypeRemaining})
                </TypographyElement>
              </>)
            : null}
        </div>
      </div>
    </div>
  )
}
