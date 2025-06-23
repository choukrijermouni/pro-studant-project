import {
  TypographyElement,
  neutral
} from '@pro_boa/ui'
import style from './style'
import { createUseStyles } from 'react-jss'
import ReportAlertBanner from '../ReportAlertBanner'

const useStyle = createUseStyles(style)

export default ({ message }) => {
  const {
    bannerContainer
  } = useStyle()
  return (
    <div className={bannerContainer}>
      <ReportAlertBanner mode='horizontal' status='alert' width='100%'>
        <TypographyElement
          variant='body1'
          fontSize='16px'
          spacing='10px'
          color={neutral[6]}
        >
          {message}
        </TypographyElement>
      </ReportAlertBanner>
    </div>
  )
}
