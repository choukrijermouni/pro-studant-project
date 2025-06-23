import Text from './text.json'
import style from './style'
import {
  TypographyElement,
  green,
  yellow,
  Container,
  neutral
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import {
  orange,
  violet,
  annualLicenseType,
  monthlyLicenseType,
  trialLicenseType
} from 'constants/'
import ReportsChartCard from 'components/Reports/ReportsChartCard'
import { useSelector } from 'react-redux'
import ReportAlertBanner from 'components/Common/ReportAlertBanner'

const useStyle = createUseStyles(style)

export default () => {
  const {
    root,
    chartsContainer,
    bannerContainer
  } = useStyle()
  const { licenseInfo, totalLearners, totalLearnersWithoutLicense } = useSelector(state => state.organization)
  const LicenseDetails = (licenseType) =>
    licenseInfo?.OrganizationLicenseDetails?.find(license => license?.OrganizationLicenseType === licenseType)

  const licenseAvailable = (
    ((LicenseDetails(monthlyLicenseType)?.LicenseTypeRemaining && LicenseDetails(monthlyLicenseType)?.LicenseTypeRemaining !== 0) ||
      (LicenseDetails(annualLicenseType)?.LicenseTypeRemaining && LicenseDetails(annualLicenseType)?.LicenseTypeRemaining !== 0) ||
      (LicenseDetails(trialLicenseType)?.LicenseTypeRemaining && LicenseDetails(trialLicenseType)?.LicenseTypeRemaining !== 0))
  )
  const licenseQuantitiesCheck = (licenseType) => {
    return LicenseDetails(licenseType)?.LicenseTypeRemaining || LicenseDetails(licenseType)?.LicenseConsumed || LicenseDetails(licenseType)?.LicenseQuantity
  }
  const { loading } = useSelector(state => state.config)
  const showRemainingChart = !(!!licenseQuantitiesCheck(monthlyLicenseType) || !!licenseQuantitiesCheck(annualLicenseType)) && !!licenseQuantitiesCheck(trialLicenseType)
  return (
    <Container nopadding className={root}>
      {
        !licenseAvailable &&
        (
          <div className={bannerContainer}>
            <ReportAlertBanner mode='horizontal' status='alert' width='100%'>
              <TypographyElement
                variant='body1'
                fontSize='16px'
                spacing='10px'
                color={neutral[6]}
              >
                {Text.noLicenseLeftMessage}
              </TypographyElement>
            </ReportAlertBanner>
          </div>
        )
      }
      <div className={chartsContainer}>
        {!!licenseQuantitiesCheck(monthlyLicenseType) &&
          <ReportsChartCard
            headerText={Text.monthlyLicenses}
            consumed={LicenseDetails(monthlyLicenseType)?.LicenseConsumed}
            left={LicenseDetails(monthlyLicenseType)?.LicenseTypeRemaining}
            total={LicenseDetails(monthlyLicenseType)?.LicenseQuantity}
            primaryColor={yellow[3]}
            secondaryColor={yellow[1]}
            loading={loading}
          />}
        {!!licenseQuantitiesCheck(annualLicenseType) &&
          <ReportsChartCard
            headerText={Text.annualLicenses}
            consumed={LicenseDetails(annualLicenseType)?.LicenseConsumed}
            left={LicenseDetails(annualLicenseType)?.LicenseTypeRemaining}
            total={LicenseDetails(annualLicenseType)?.LicenseQuantity}
            primaryColor={green[2]}
            secondaryColor={green[1]}
            loading={loading}
          />}
        {showRemainingChart &&
          <ReportsChartCard
            headerText={Text.trialLicenses}
            consumed={LicenseDetails(trialLicenseType)?.LicenseConsumed}
            left={LicenseDetails(trialLicenseType)?.LicenseTypeRemaining}
            total={LicenseDetails(trialLicenseType)?.LicenseQuantity}
            primaryColor={violet[1]}
            secondaryColor={violet[0]}
            loading={loading}
          />}
        {
          totalLearners
            ? (
              <ReportsChartCard
                headerText={Text.partitions}
                consumed={totalLearners - totalLearnersWithoutLicense}
                left={totalLearnersWithoutLicense}
                total={totalLearners}
                primaryColor={orange[1]}
                secondaryColor={orange[0]}
                userChartCard
                loading={loading}
              />)
            : null
        }
      </div>
    </Container>
  )
}
