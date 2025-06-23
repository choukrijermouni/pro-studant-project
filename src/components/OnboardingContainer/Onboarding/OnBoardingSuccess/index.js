import {
  Container,
  TypographyElement,
  Button,
  Paper,
  Icon,
  Icons
} from '@pro_boa/ui'
import style from './style'
import Text from './text.json'
import { createUseStyles } from 'react-jss'
import { logo as pro_boa } from 'assets/index'
import { congratulations } from 'assets'
import { completeOnboardingAction } from 'pages/OnboardingContainer/store'
import { useDispatch } from 'react-redux'
import { salesB2B } from 'constants/'

const useStyle = createUseStyles(style)

export default ({ setStep }) => {
  const {
    rootClass,
    horizantalDivider,
    licenseButtons,
    body,
    paper,
    logo,
    content,
    contactCard,
    icon,
    contact,
    image,
    flex
  } = useStyle()
  const dispatch = useDispatch()
  return (
    <div className={body}>
      <Paper className={paper}>
        <div className={content}>
          <Container className={rootClass}>
            <img src={pro_boa} alt='notification' className={logo} />
            <div className={flex}>
              <div>
                <TypographyElement
                  component='h3'
                  spacing='56px 0 16px 0'
                  lineHeight='40px'
                  variant='heading1'
                  fontWeight='bold'
                >
                  {Text.headerFirst} {Text.headerSecond}
                </TypographyElement>

                <TypographyElement
                  component='h4'
                  variant='heading4'
                  align='left'
                  spacing='34px 0 16px 0'
                  fontWeight='bold'
                >
                  {Text.contact}
                </TypographyElement>
                <div className={contactCard}>
                  <div className={contact}>
                    <Icon iconName={Icons.smartPhone} style={icon} />
                    <TypographyElement
                      component='h4'
                      variant='heading4'
                      align='left'
                      spacing='17px 0 16px 16px'
                      fontWeight='bold'
                    >
                      {salesB2B.SalesPhone}
                    </TypographyElement>
                  </div>
                  <div className={contact}>
                    <Icon iconName={Icons.envelope} style={icon} />
                    <TypographyElement
                      component='h4'
                      variant='heading4'
                      align='left'
                      spacing='17px 0 16px 16px'
                      fontWeight='bold'
                    >
                      {salesB2B.SalesEmail}
                    </TypographyElement>
                  </div>
                </div>
              </div>
              <object type='image/svg+xml' data={congratulations} className={image}>svg-animation</object>
            </div>
            <div className={horizantalDivider} />
            <div className={licenseButtons}>
              <Button
                handleClick={() => dispatch(completeOnboardingAction())}
                width={153}
                label={Text.finish}
              />
            </div>
          </Container>
        </div>
      </Paper>
    </div>
  )
}
