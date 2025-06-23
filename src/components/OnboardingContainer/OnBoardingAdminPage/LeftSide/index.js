import { createUseStyles } from 'react-jss'
import {
  neutral,
  TypographyElement,
  Paper,
  Icon,
  Icons
} from '@pro_boa/ui'
import style from './style'
import Text from './text.json'
import { pro_boaLogoWhite, onboardingInfo, onboardingPassword } from 'assets'
import { adminOnboardingSteps } from 'constants/'

const useStyles = createUseStyles(style)

export default ({ step }) => {
  const {
    paperStyle,
    image,
    iconClass,
    logo,
    stepsContainer
  } = useStyles()
  return (
    <>
      <div>
        <object type='image/svg+xml' data={pro_boaLogoWhite} className={image}>svg-animation</object>
        <TypographyElement
          variant='heading2'
          spacing='0 0 26px 0'
          fontSize='35px'
          color={neutral[0]}
        >
          {Text.welcome}
        </TypographyElement>
        <TypographyElement
          variant='heading2'
          spacing='0 0 48px 0'
          fontSize='16px'
          lineHeight='20px'
          color={neutral[0]}
        >
          {Text.subTitle}
        </TypographyElement>
        <TypographyElement
          variant='heading2'
          fontSize='16px'
          lineHeight='20px'
          fontWeight='200px'
          color={neutral[0]}
        >
          {step === adminOnboardingSteps.firstStep ? Text.steps1 : Text.steps2}
        </TypographyElement>
        <div>
          <Paper className={paperStyle}>
            <div className={stepsContainer}>
              <object type='image/svg+xml' data={onboardingInfo} className={logo}>svg-animation</object>
              <TypographyElement
                variant='heading2'
                fontSize='16px'
                lineHeight='20px'
                fontWeight='200px'
                spacing='0'
              >
                {Text.profileInfo}
              </TypographyElement>
            </div>
            {(step === adminOnboardingSteps.secondStep || step === adminOnboardingSteps.successStep) &&
              <Icon iconName={Icons.success} style={iconClass} />}
          </Paper>
          <Paper className={paperStyle}>
            <div className={stepsContainer}>
              <object type='image/svg+xml' data={onboardingPassword} className={logo}>svg-animation</object>
              <TypographyElement
                variant='heading2'
                fontSize='16px'
                lineHeight='20px'
                fontWeight='200px'
                spacing='0'
              >
                {Text.intrests}
              </TypographyElement>
            </div>
            {step === adminOnboardingSteps.successStep && <Icon iconName={Icons.success} style={iconClass} />}
          </Paper>
        </div>
      </div>
    </>
  )
}
