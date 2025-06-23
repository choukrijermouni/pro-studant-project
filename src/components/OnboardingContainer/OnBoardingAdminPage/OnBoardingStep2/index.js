import { createUseStyles } from 'react-jss'
import {
  Paper
} from '@pro_boa/ui'
import style from './style'
import RightSide from './RightSide'
import LeftSide from '../LeftSide'
import { adminOnboardingSteps } from 'constants/'

const useStyles = createUseStyles(style)

export default ({ setStep, isInvited }) => {
  const scale = window.devicePixelRatio
  const {
    containerPaperStyle,
    containerStyle,
    bluePartStyle,
    whitePartStyle
  } = useStyles({ scale })
  return (
    <div className={containerStyle}>
      <Paper className={containerPaperStyle}>
        <div className={bluePartStyle}>
          <LeftSide step={adminOnboardingSteps.secondStep} />
        </div>
        <div className={whitePartStyle}>
          <RightSide setStep={setStep} isInvited={isInvited} />
        </div>
      </Paper>
    </div>
  )
}
