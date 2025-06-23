import {
  TypographyElement,
  Button,
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
import { tipIcon } from 'assets'
import { scrollUp } from 'helpers'

const useStyle = createUseStyles(style)

const defaultNumberOfLicenses = 0
const noLicenseType = 0

export default ({ handleClose }) => {
  const {
    paperStyle,
    root,
    header,
    tipStyle,
    messageContainer,
    helpIconClass,
    spanStyle,
    IntercomSpanStyle,
    typeStyle,
    boxStyle,
    valuestyle
  } = useStyle()
  const dispatch = useDispatch()
  const [quantityYearly, setQuantityYearly] = useState(defaultNumberOfLicenses)
  const [quantityMonthly, setQuantityMonthly] = useState(defaultNumberOfLicenses)
  const [licenseAnnualType, setLicenseAnnualType] = useState(noLicenseType)
  const [licenseMonthlyType, setLicenseMonthlyType] = useState(noLicenseType)
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
        <TypographyElement
          variant='body2'
          align='left'
          lineHeight='22px'
          margin='22px 0 0'
        >
          {Text.subTitle}
        </TypographyElement>
      </div>
      <div className={paperStyle}>
        <div className={typeStyle}>
          <TypographyElement
            variant='body1'
            fontSize='12px'
            lineHeight='18px'
            margin='0 0 4px'
          >
            {Text.licenseType}
          </TypographyElement>

          <LicensceSelectItem
            selected={licenseAnnualType === annualLicenseType}
            info={Text.licenseTypes.Annual}
            width='100%'
          />
        </div>
        <div className={typeStyle}>
          <TypographyElement
            variant='body1'
            fontSize='12px'
            lineHeight='18px'
            margin='16px 0 4px'
          >
            {Text.licenseQuantity}
          </TypographyElement>
          <div
            className={valuestyle}
            onClick={() => {
              setLicenseAnnualType(annualLicenseType)
              setLicenseMonthlyType(noLicenseType)
            }}
          >
            <input
              maxlength='5'
              value={quantityYearly}
              onChange={(e) => {
                setQuantityYearly(e.target.value)
              }}
              type='text'
              className={boxStyle}
            />
            <input type='button' value='-' className={boxStyle} onClick={() => setQuantityYearly(parseInt(quantityYearly) - 1)} disabled={quantityYearly <= 0} />
            <input type='button' value='+' className={boxStyle} onClick={() => setQuantityYearly(parseInt(quantityYearly) + 1)} />
          </div>
        </div>
      </div>

      <div className={paperStyle}>
        <div className={typeStyle}>
          <TypographyElement
            variant='body1'
            fontSize='12px'
            lineHeight='18px'
            margin='0 0 4px'
          >
            {Text.licenseType}
          </TypographyElement>

          <LicensceSelectItem
            selected={licenseMonthlyType === monthlyLicenseType}
            info={Text.licenseTypes.Monthly}
            width='100%'
          />
        </div>
        <div className={typeStyle}>
          <TypographyElement
            variant='body1'
            fontSize='12px'
            lineHeight='18px'
            margin='16px 0 4px'
          >
            {Text.licenseQuantity}
          </TypographyElement>
          <div
            className={valuestyle}
            onClick={() => {
              setLicenseMonthlyType(monthlyLicenseType)
              setLicenseAnnualType(noLicenseType)
            }}
          >
            <input
              maxlength='5'
              value={quantityMonthly}
              onChange={(e) => {
                setQuantityMonthly(e.target.value)
              }}
              type='text'
              className={boxStyle}
            />
            <input type='button' value='-' className={boxStyle} onClick={() => setQuantityMonthly(parseInt(quantityMonthly) - 1)} disabled={quantityMonthly <= 0} />
            <input type='button' value='+' className={boxStyle} onClick={() => setQuantityMonthly(parseInt(quantityMonthly) + 1)} />
          </div>
        </div>
      </div>
      <TypographyElement
        variant='body2'
        align='left'
        lineHeight='22px'
        margin='22px 0 0'
      >
        {Text.order}
      </TypographyElement>
      <Button
        handleClick={() => {
          scrollUp()
          handleClose()
          dispatch(orderOrganizationLicensesAction({ licenses: { [annualLicenseType]: quantityYearly, [monthlyLicenseType]: quantityMonthly } }))
        }}
        size='big'
        variation='primary'
        marginButton='8px 0 28px'
        label={Text.submit}
        width='100%'
        disabled={!quantityYearly && !quantityMonthly}
      />
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
          spacing='0 0 16px 17px'
          fontSize={13}
          color={neutral[6]}
        >
          {Text.tipContent.body.first} <span onClick={() => window.Intercom('showNewMessage')} className={IntercomSpanStyle}>{Text.tipContent.link}</span>{Text.tipContent.body.second} <a href={`mailto:${Text.tipContent.email}`} className={spanStyle}>{Text.tipContent.email}</a> {Text.tipContent.body.last} <a href={`tel:${Text.tipContent.phone}`} className={spanStyle}>{Text.tipContent.phone}</a>
        </TypographyElement>
      </div>
    </div>
  )
}
