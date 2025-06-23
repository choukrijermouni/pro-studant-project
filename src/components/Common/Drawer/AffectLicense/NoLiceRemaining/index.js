import {
  TypographyElement,
  Icon,
  Icons
} from '@pro_boa/ui'
import { useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLearnerAttributionHistoryAction } from 'pages/LearnerProfile/store'
import { contactB2B } from 'constants/'
import { fetchLicenseInfoAction } from 'pages/Home/store'

const useStyle = createUseStyles(style)
const noLoaderAction = true

export default () => {
  const {
    noLicensesStyle,
    contactInfoStyle,
    contactIcon
  } = useStyle()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { TotalLicensesRemaining } = useSelector(({ organization }) => organization.licenseInfo)
  useEffect(() => { dispatch(fetchLicenseInfoAction(noLoaderAction)) }, [])
  useEffect(() => { dispatch(fetchLearnerAttributionHistoryAction(id)) }, [id])
  return (
    <>
      <div className={noLicensesStyle}>
        <TypographyElement
          component='p'
          variant='body2'
          align='left'
        >
          {`${TotalLicensesRemaining ? Text.noLicenseLeftMessage : Text.noLicenseMessage}`}
        </TypographyElement>
        <TypographyElement
          component='p'
          variant='body2'
          fontWeight='bold'
          align='left'
        >
          {` ${contactB2B?.ContactName}`}
        </TypographyElement>
      </div>
      <div onClick={() => window.open(`mailto:${contactB2B?.ContactEmail}`)} className={contactInfoStyle}>
        <Icon
          iconName={Icons.envelope}
          style={contactIcon}
        />
        <TypographyElement
          component='p'
          variant='body2'
          fontWeight='bold'
          align='left'
        >
          {contactB2B?.ContactEmail}
        </TypographyElement>
      </div>
      <div onClick={() => window.open(`tel:${contactB2B?.ContactPhone}`)} className={contactInfoStyle}>
        <Icon
          iconName={Icons.smartPhone}
          style={contactIcon}
        />
        <TypographyElement
          component='p'
          variant='body2'
          fontWeight='bold'
          align='left'
        >
          {contactB2B?.ContactPhone}
        </TypographyElement>
      </div>
    </>
  )
}
