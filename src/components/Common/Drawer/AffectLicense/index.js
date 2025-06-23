import {
  TypographyElement,
  Button,
  ButtonSize,
  ButtonVariation,
  SelectList,
  CheckBox
} from '@pro_boa/ui'
import { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchLearnerAttributionHistoryAction,
  affectLicenseToLearnerActions
} from 'pages/LearnerProfile/store'
import {
  AdminRole,
  annualLicenseType,
  monthlyLicenseType,
  trialLicenseType
} from 'constants/'
import { fetchLicenseInfoAction } from 'pages/Home/store'
import NoLiceRemaining from './NoLiceRemaining'
import LicenseSelectList from '../AffectLicenses/LicenseSelectList'
import RemainingLicenses from '../AffectLicenses/RemainingLicenses'
import LearnerCard from 'components/Common/Cards/LearnerCard'
import { scrollUp } from 'helpers'

const useStyle = createUseStyles(style)

const maxLicensesBeforeDropDownSelect = 3
const defaultSelectItem = { Id: -1, Name: Text.Other }
const defaultNumberOfLicenses = 1
const noLoaderAction = true

export default ({ handleClose, setPage }) => {
  const { OrganizationLicenseDetails = [], TotalLicensesRemaining } = useSelector(({ organization }) => organization.licenseInfo)
  const { user } = useSelector(({ identity }) => identity)
  const { Photo, FirstName, LastName, Id, TeamName } = useSelector(({ profile }) => profile)
  const {
    quantity,
    checkBox,
    checkBoxContainer,
    licenseTitle,
    quantityButtonsStyle,
    slidIn
  } = useStyle()
  const [quantityButton, setQuantityButton] = useState(defaultNumberOfLicenses)
  const [subscription, setSubscription] = useState({ LicenseTypeRemaining: 0 })
  const [quantityRange, setQuantityRange] = useState(defaultSelectItem)
  const [informCheckbox, setInformCheckbox] = useState(true)
  const LicenseDetails = (licenseType) => OrganizationLicenseDetails?.find(license => license?.OrganizationLicenseType === licenseType)
  const initialSelectedLicense = LicenseDetails(annualLicenseType)?.LicenseTypeRemaining
    ? annualLicenseType
    : LicenseDetails(monthlyLicenseType)?.LicenseTypeRemaining
      ? monthlyLicenseType
      : LicenseDetails(trialLicenseType)?.LicenseTypeRemaining
        ? trialLicenseType
        : null
  const [subscriptionButton, setSubscriptionButton] = useState(initialSelectedLicense)
  const dispatch = useDispatch()
  useEffect(() => dispatch(fetchLicenseInfoAction(noLoaderAction)), [])
  useEffect(() => dispatch(fetchLearnerAttributionHistoryAction(Id)), [Id])
  useEffect(() => {
    const reversedLicenseDetails = OrganizationLicenseDetails.slice().reverse()
    reversedLicenseDetails.map(license => {
      if (license.LicenseTypeRemaining) {
        setSubscriptionButton(license.OrganizationLicenseType)
        setSubscription(license)
      }
      return license
    })
  }, [OrganizationLicenseDetails])
  const handleChangeSelectedLicense = (license) => {
    setSubscriptionButton(license)
    setSubscription(LicenseDetails(license))
    setQuantityButton(defaultNumberOfLicenses)
    setQuantityRange(defaultSelectItem)
  }
  const quantityRanges = Array.from({ length: subscription.LicenseTypeRemaining }, (_, i) => ({ Id: i + 1, Name: String(i + 1) }))
  return (
    <>
      {user?.role?.includes(AdminRole)
        ? (
          <>
            <div className={licenseTitle}>
              <TypographyElement
                component='h3'
                variant='heading3'
                align='left'
              >
                {Text.newLicense.newLicenseTitle}
              </TypographyElement>
            </div>
            <div className={slidIn}>
              {TotalLicensesRemaining
                ? (
                  <>
                    <LearnerCard Photo={Photo} FirstName={FirstName} LastName={LastName} TeamName={TeamName} />
                    <RemainingLicenses OrganizationLicenseDetails={OrganizationLicenseDetails} TotalLicensesRemaining={TotalLicensesRemaining} />
                    {LicenseDetails(annualLicenseType)?.LicenseTypeRemaining && LicenseDetails(monthlyLicenseType)?.LicenseTypeRemaining ? <LicenseSelectList selectedLicense={subscriptionButton} setSelectedLicense={handleChangeSelectedLicense} /> : null}
                    <TypographyElement
                      component='h4'
                      spacing='20px 0 4px'
                      variant='body1'
                      fontSize='12px'
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
                    <div className={checkBoxContainer}>
                      <CheckBox
                        dataTest='license-agreement-checkbox'
                        className={checkBox}
                        label={Text.inform}
                        id='inform-checkbox'
                        checked={informCheckbox}
                        handleChange={() => setInformCheckbox(!informCheckbox)}
                      />
                    </div>
                    <Button
                      dataTest='affect-license-button'
                      backgroundColorHover='none'
                      disabled={subscriptionButton === 0}
                      variation={ButtonVariation.primary}
                      size={ButtonSize.big}
                      label={Text.submit}
                      width='100%'
                      height={47}
                      marginButton='15px 0 15px 0'
                      handleClick={() => {
                        dispatch(affectLicenseToLearnerActions(Id, subscriptionButton, quantityButton, informCheckbox))
                        scrollUp()
                        handleClose && handleClose()
                      }}
                    />
                  </>)
                : <NoLiceRemaining />}
            </div>
          </>)
        : null}
    </>
  )
}
