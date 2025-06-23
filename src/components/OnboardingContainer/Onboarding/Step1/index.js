import {
  Paper,
  Button,
  TypographyElement
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import styles from './style'
import { logo as pro_boa } from 'assets/index'
import Text from './text.json'
import FeatureCard from 'components/OnboardingContainer/FeatureCard'
import features from './featuresConfig'
import { chunk } from 'lodash'
import { onboardingSteps } from 'constants/'

const useStyle = createUseStyles(styles)

const splitFeatures = chunk(features, 2).map(chunkFeatures => {
  chunkFeatures.push(...Array(2 - chunkFeatures.length))
  return chunkFeatures
})
export default ({ setStep }) => {
  const { paper, content, logo, line, licenseButtons, body, view, cardDeck } = useStyle()
  return (
    <div className={body}>
      <Paper className={paper}>
        <div className={content}>
          <img src={pro_boa} alt='notification' className={logo} />
          <TypographyElement
            component='h2'
            variant='heading2'
            align='left'
            spacing='40px 0 8px'
          >
            {Text.title}
          </TypographyElement>
          <TypographyElement
            component='h4'
            variant='body2'
            align='left'
            spacing='8px 0'
          >
            {Text.subHeader.first}{Text.subHeader.second}
          </TypographyElement>
          <TypographyElement
            component='h4'
            variant='heading4'
            align='left'
            spacing='8px 0'
          >
            {Text.subTitle}
          </TypographyElement>
          <div className={cardDeck}>
            {
              splitFeatures.map((card, key) =>
              (
                <div key={key} className={view}>
                  {
                    card.map((feature, id) => (
                      feature !== undefined
                        ? <FeatureCard key={id} cardIcon={feature.icon} context={feature.text} cardColor={feature.color} width={539} />
                        : <div />
                    ))
                  }
                </div>))
            }
          </div>
          <hr className={line} />
          <div className={licenseButtons}>
            <Button
              handleClick={() => setStep(onboardingSteps.newTraining)}
              width={153}
              label={Text.discoverButton}
            />
          </div>
        </div>
      </Paper>
    </div>
  )
}
