import {
  Row,
  TypographyElement,
  Button,
  SelectList,
  neutral,
  ButtonVariation,
  ButtonSize
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLicenseInfoAction } from 'pages/Home/store'
import { useEffect, useState } from 'react'
import { AdminRole, annualLicenseType, monthlyLicenseType, trialLicenseType } from 'constants/'
import { getNoActiveLicenseLearnersAction } from 'pages/Learners/store'
import RemainingLicenses from '../AffectLicenses/RemainingLicenses'
import { fetchAllTeamsAction } from 'pages/Teams/store'
import AddLearnerForm from './AddLearnerForm'
import { tipIcon } from 'assets'
import { useDrawer } from '../drawerContext'
import LicenseSelectList from '../AffectLicenses/LicenseSelectList'

const useStyle = createUseStyles(style)
const noLoaderAction = true
const defaultNumberOfLicenses = 1
const maxLicensesBeforeDropDownSelect = 3
const defaultSelectItem = { Id: -1, Name: Text.other }

export default ({ handleClose }) => {
  const {
    root,
    header,
    row,
    messageContainer,
    helpIconClass,
    tipStyle,
    spanStyle,
    IntercomSpanStyle,
    quantityRow,
    quantity,
    quantityButtonsStyle
  } = useStyle()
  const { openDrawer, closeDrawer } = useDrawer()
  const dispatch = useDispatch()
  const { OrganizationLicenseDetails = [], TotalLicensesRemaining } = useSelector(({ organization }) => organization.licenseInfo)
  const LicenseDetails = (licenseType) => OrganizationLicenseDetails?.find(license => license?.OrganizationLicenseType === licenseType)
  const licensesRemainingAnnual = LicenseDetails(annualLicenseType)?.LicenseTypeRemaining
  const licensesRemainingMonthly = LicenseDetails(monthlyLicenseType)?.LicenseTypeRemaining
  const licensesRemainingTrial = LicenseDetails(trialLicenseType)?.LicenseTypeRemaining
  const hideLicensesContainer = !licensesRemainingAnnual && !licensesRemainingMonthly && !licensesRemainingTrial

  useEffect(() => {
    dispatch(fetchLicenseInfoAction(noLoaderAction))
    dispatch(getNoActiveLicenseLearnersAction())
  }, [])
  const initialSelectedLicense = licensesRemainingAnnual ? annualLicenseType : licensesRemainingMonthly ? monthlyLicenseType : licensesRemainingTrial ? trialLicenseType : null
  const { user } = useSelector(({ identity }) => identity)
  const [teams, setTeams] = useState([])
  if (!user?.role?.includes(AdminRole)) return null
  const { allTeams } = useSelector(state => state.teams)
  const { isManager, Id } = useSelector(({ organizationProfile }) => organizationProfile)
  const [selectedLicense, setSelectedLicense] = useState(initialSelectedLicense)
  const [subscription, setSubscription] = useState({ LicenseTypeRemaining: 0 })
  const [quantityButton, setQuantityButton] = useState(defaultNumberOfLicenses)
  const [quantityRange, setQuantityRange] = useState(defaultSelectItem)
  useEffect(() => {
    dispatch(fetchAllTeamsAction(isManager ? Id : null))
  }, [])
  useEffect(() => {
    const reformedData = allTeams?.Items?.map(element => {
      element.Value = element.Name
      return element
    })
    !isManager && reformedData?.unshift({
      Id: null,
      Value: Text.none
    })
    setTeams(reformedData)
  }, [allTeams])

  const handleChangeSelectedLicense = (license) => {
    setSelectedLicense(license)
    setQuantityButton(defaultNumberOfLicenses)
  }
  useEffect(() => {
    const reversedLicenseDetails = OrganizationLicenseDetails?.slice().reverse()
    reversedLicenseDetails?.map(license => {
      if (license.LicenseTypeRemaining && license.OrganizationLicenseType === selectedLicense) {
        setSubscription(license)
      }
      return license
    })
  }, [OrganizationLicenseDetails, selectedLicense])
  const quantityRanges = Array.from({ length: subscription.LicenseTypeRemaining }, (_, i) => ({ Id: i + 1, Name: String(i + 1) }))
  return (
    <div className={root}>
      <div className={header}>
        <TypographyElement
          component='h3'
          variant='heading3'
          align='left'
          display='flex'
        >
          {Text.title}
        </TypographyElement>
      </div>
      <RemainingLicenses OrganizationLicenseDetails={OrganizationLicenseDetails} TotalLicensesRemaining={TotalLicensesRemaining} />
      {licensesRemainingAnnual && licensesRemainingMonthly ? <LicenseSelectList selectedLicense={selectedLicense} setSelectedLicense={handleChangeSelectedLicense} /> : null}
      <div className={root}>
        {hideLicensesContainer
          ? (
            <Row>
              <Row className={row}>
                <TypographyElement
                  component='h4'
                  variant='smallText'
                  align='left'
                  spacing='16px 0 32px'
                  fontSize={14}
                >
                  {Text.noLicense}
                </TypographyElement>
                <Button
                  dataTest='create-team-button'
                  label={Text.noLicenseButton}
                  width='100%'
                  marginButton=' 0 0 200px'
                  handleClick={() => {
                    openDrawer(
                      {
                        componentName: 'orderLicensesNew',
                        props: {
                          handleClose: closeDrawer
                        }
                      }
                    )
                  }}
                />
              </Row>
            </Row>)
          : (
            <Row>
              <Row className={quantityRow}>
                <TypographyElement
                  component='h4'
                  variant='smallText'
                  align='left'
                  spacing='20px 0 13px 0'
                >
                  {Text.newLicense.licenseQuantity}
                </TypographyElement>
                <div className={quantity}>
                  {quantityRanges.length > 0 &&
                    quantityRanges.slice(0, maxLicensesBeforeDropDownSelect).map(quantity =>
                      <Button
                        dataTest={`${quantity.Name}-license-button`}
                        key={quantity.Id}
                        backgroundColorHover='none'
                        variation={quantityButton === quantity.Id ? ButtonVariation.primary : ButtonVariation.secondary}
                        size={ButtonSize.big}
                        label={quantity.Name}
                        height={45}
                        handleClick={() => {
                          setQuantityButton(quantity.Id)
                          setQuantityRange(defaultSelectItem)
                        }}
                        className={quantityButtonsStyle}
                      />
                    )}
                  {quantityRanges.length > maxLicensesBeforeDropDownSelect && (
                    <SelectList
                      dataTest='quantity-select-list'
                      label=''
                      valueField='Name'
                      selectedItem={quantityRange.Name}
                      onSelectedItem={(item) => {
                        setQuantityRange(item)
                        setQuantityButton(item.Id)
                      }}
                      items={quantityRanges.slice(maxLicensesBeforeDropDownSelect)}
                    />)}
                </div>
              </Row>
              <AddLearnerForm
                teams={teams}
                selectedLicense={selectedLicense}
                quantityButton={quantityButton}
                handleClose={handleClose}
              />
            </Row>)}

        <div className={tipStyle}>
          <a className={messageContainer}>
            <img src={tipIcon} alt='helpIcon' className={helpIconClass} />
            <TypographyElement
              component='h4'
              variant='smallText'
              align='left'
              spacing='0 11px'
              fontSize={13}
              color={neutral[6]}
            >
              {Text.tip}
            </TypographyElement>
          </a>
          <TypographyElement
            component='h4'
            variant='smallText'
            align='left'
            spacing='0  17px 16px'
            fontSize={13}
            color={neutral[6]}
          >
            {Text.tipContent.body.first} <span onClick={() => window.Intercom('showNewMessage')} className={IntercomSpanStyle}>{Text.tipContent.link}</span>{Text.tipContent.body.second} <a href={`mailto:${Text.tipContent.email}`} className={spanStyle}>{Text.tipContent.email}</a> {Text.tipContent.body.last} <a href={`tel:${Text.tipContent.phone}`} className={spanStyle}>{Text.tipContent.phone}</a>
          </TypographyElement>
        </div>
      </div>

    </div>
  )
}
