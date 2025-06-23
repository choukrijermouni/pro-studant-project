import {
  Paper,
  Button,
  TypographyElement
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import styles from './style'
import { logo as pro_boa } from 'assets/index'
import Text from './text.json'
import { onboardingSteps, OnboardingVideos } from 'constants/'

const useStyle = createUseStyles(styles)

export default ({ setStep }) => {
  const { paper, content, logo, line, licenseButtons, body, video } = useStyle()
  return (
    <div className={body}>
      <Paper className={paper}>
        <div className={content}>
          <img src={pro_boa} alt='notification' className={logo} />
          <TypographyElement
            component='h2'
            variant='heading2'
            align='left'
            spacing='40px 0 0 0'
          >
            {Text.title}
          </TypographyElement>
          <TypographyElement
            component='h4'
            variant='body2'
            align='left'
            spacing='8px 0 26px 0'
          >
            {Text.subHeader.first}{Text.subHeader.second}
          </TypographyElement>
          <video src={OnboardingVideos.OldB2BCustomers} className={video} controls />
          <hr className={line} />
          <div className={licenseButtons}>
            <Button
              handleClick={() => setStep(onboardingSteps.changePassword)}
              width={153}
              label={Text.continueButton}
            />
          </div>
        </div>
      </Paper>
    </div>
  )
}
