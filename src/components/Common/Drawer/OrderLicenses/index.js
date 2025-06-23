import {
  TypographyElement,
  Button,
  ButtonSize,
  SelectList,
  ButtonVariation,
  Paper,
  neutral
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import LicensceSelectItem from '../AffectLicenses/LicensceSelectItem'
import { useState } from 'react'
import { annualLicenseType, monthlyLicenseType } from 'constants/'
import { useDispatch } from 'react-redux'
import { orderOrganizationLicensesAction } from 'pages/Home/store'
import { help } from 'assets'
import { scrollUp } from 'helpers'

const useStyle = createUseStyles(style)

const defaultNumberOfLicenses = 1
const maxLicensesBeforeDropDownSelect = 3
const maxLicenses = 10
const defaultSelectItem = { Id: -1, Name: Text.other }
const moreSelectItem = { Id: 11, Name: Text.more }
const noLicenseType = 0

export default ({ handleClose }) => {
  const { root, header, quantity, quantityButtonsStyle, licenseTypeContainer, tipStyle, messageContainer, helpIconClass, spanStyle, IntercomSpanStyle } = useStyle()
  const dispatch = useDispatch()
  const [quantityYearlyButton, setQuantityYearlyButton] = useState(defaultNumberOfLicenses)
  const [quantityYearlyRange, setQuantityYearlyRange] = useState(defaultSelectItem)
  const [quantityMonthlyButton, setQuantityMonthlyButton] = useState(defaultNumberOfLicenses)
  const [quantityMonthlyRange, setQuantityMonthlyRange] = useState(defaultSelectItem)
  const [licenseAnnualType, setLicenseAnnualTypeType] = useState(noLicenseType)
  const [licenseMonthlyType, setLicenseMonthlyTypeType] = useState(noLicenseType)
  const quantityRanges = Array.from({ length: maxLicenses }, (_, i) => ({ Id: i + 1, Name: String(i + 1) }))
  quantityRanges.push(moreSelectItem)
  return (
    <div className={root}>
      <div className={header}>
        <TypographyElement
          component='h3'
          variant='heading3'
          align='left'
        >
          {Text.title}
        </TypographyElement>
      </div>
      <TypographyElement
        fontWeight={600}
        fontSize='13px'
        lineHeight='16px'
        margin='24px 0 12px 0'
      >
        {Text.licenseType}
      </TypographyElement>
      <LicensceSelectItem
        selected={licenseAnnualType === annualLicenseType}
        handleClick={() => {
          setQuantityYearlyButton(defaultNumberOfLicenses)
          setLicenseAnnualTypeType(licenseAnnualType === annualLicenseType ? noLicenseType : annualLicenseType)
        }} info={Text.licenseTypes.Annual}
        width='100%'
      />
      {licenseAnnualType === annualLicenseType
        ? (
          <>
            <TypographyElement
              fontWeight={600}
              fontSize='13px'
              lineHeight='16px'
              margin='24px 0 12px 0'
            >
              {Text.licenseQuantity}
            </TypographyElement>
            <div className={quantity}>
              {quantityRanges.length > 0 &&
                quantityRanges.slice(0, maxLicensesBeforeDropDownSelect).map(quantity =>
                  <Button
                    dataTest={`${quantity.Name}-license-button`}
                    key={quantity.Id}
                    backgroundColorHover='none'
                    variation={quantityYearlyButton === quantity.Id ? ButtonVariation.primary : ButtonVariation.secondary}
                    size={ButtonSize.big}
                    label={quantity.Name}
                    height={45}
                    handleClick={() => {
                      setQuantityYearlyButton(quantity.Id)
                      setQuantityYearlyRange(defaultSelectItem)
                    }}
                    className={quantityButtonsStyle}
                  />
                )}
              {quantityRanges.length > maxLicensesBeforeDropDownSelect && (
                <SelectList
                  dataTest='quantity-select-list'
                  label=''
                  valueField='Name'
                  selectedItem={quantityYearlyRange.Name}
                  onSelectedItem={(item) => {
                    setQuantityYearlyRange(item)
                    setQuantityYearlyButton(item.Id)
                  }}
                  items={quantityRanges.slice(maxLicensesBeforeDropDownSelect)}
                />)}
            </div>
          </>)
        : null}
      <div className={licenseTypeContainer}>
        <LicensceSelectItem
          selected={licenseMonthlyType === monthlyLicenseType}
          handleClick={() => {
            setQuantityMonthlyButton(defaultNumberOfLicenses)
            setLicenseMonthlyTypeType(licenseMonthlyType === monthlyLicenseType ? noLicenseType : monthlyLicenseType)
          }} info={Text.licenseTypes.Monthly}
          width='100%'
        />
      </div>
      {licenseMonthlyType === monthlyLicenseType
        ? (
          <>
            <TypographyElement
              fontWeight={600}
              fontSize='13px'
              lineHeight='16px'
              margin='24px 0 12px 0'
            >
              {Text.licenseQuantity}
            </TypographyElement>
            <div className={quantity}>
              {quantityRanges.length > 0 &&
                quantityRanges.slice(0, maxLicensesBeforeDropDownSelect).map(quantity =>
                  <Button
                    dataTest={`${quantity.Name}-license-button`}
                    key={quantity.Id}
                    backgroundColorHover='none'
                    variation={quantityMonthlyButton === quantity.Id ? ButtonVariation.primary : ButtonVariation.secondary}
                    size={ButtonSize.big}
                    label={quantity.Name}
                    height={45}
                    handleClick={() => {
                      setQuantityMonthlyButton(quantity.Id)
                      setQuantityMonthlyRange(defaultSelectItem)
                    }}
                    className={quantityButtonsStyle}
                  />
                )}
              {quantityRanges.length > maxLicensesBeforeDropDownSelect && (
                <SelectList
                  dataTest='quantity-select-list'
                  label=''
                  valueField='Name'
                  selectedItem={quantityMonthlyRange.Name}
                  onSelectedItem={(item) => {
                    setQuantityMonthlyRange(item)
                    setQuantityMonthlyButton(item.Id)
                  }}
                  items={quantityRanges.slice(maxLicensesBeforeDropDownSelect)}
                />)}
            </div>
          </>)
        : null}
      <Button
        handleClick={() => {
          scrollUp()
          dispatch(orderOrganizationLicensesAction({ licenses: { [annualLicenseType]: licenseAnnualType === annualLicenseType ? quantityYearlyButton : 0, [monthlyLicenseType]: licenseMonthlyType === monthlyLicenseType ? quantityMonthlyButton : 0 } }))
          handleClose()
        }}
        size='big'
        variation='primary'
        marginButton='16px 0 200px'
        label={Text.submit}
        width='100%'
        disabled={licenseAnnualType === noLicenseType && licenseMonthlyType === noLicenseType}
      />
      <Paper className={tipStyle}>
        <a className={messageContainer}>
          <img src={help} alt='helpIcon' className={helpIconClass} />
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
          spacing='0 0 16px 17px'
          fontSize={13}
          color={neutral[6]}
        >
          {Text.tipContent.body.first} <span onClick={() => window.Intercom('showNewMessage')} className={IntercomSpanStyle}>{Text.tipContent.link}</span>{Text.tipContent.body.second} <a href={`mailto:${Text.tipContent.email}`} className={spanStyle}>{Text.tipContent.email}</a> {Text.tipContent.body.last} <a href={`tel:${Text.tipContent.phone}`} className={spanStyle}>{Text.tipContent.phone}</a>
        </TypographyElement>
      </Paper>
    </div>
  )
}
