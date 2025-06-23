import {
  Container,
  Row,
  Button,
  TypographyElement
} from '@pro_boa/ui'
import style from './style'
import Text from './text.json'
import { createUseStyles } from 'react-jss'
import { completeOnboardingAction, createUserAndCompleteOnboarding } from 'pages/OnboardingContainer/store'
import { useDispatch, useSelector } from 'react-redux'
import { AdminRole, OnboardingVideos } from 'constants/'

const useStyle = createUseStyles(style)

export default ({ isInvited }) => {
  const {
    rootClass,
    horizantalDivider,
    buttonsContainer,
    container,
    video
  } = useStyle()
  const dispatch = useDispatch()
  const { user } = useSelector(({ identity }) => identity)
  return (
    <>
      <Container className={rootClass}>
        <div className={container}>
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
            {Text.subHeader}
          </TypographyElement>
          <video src={user?.role?.includes(AdminRole) ? OnboardingVideos.NewB2BAdmin : OnboardingVideos.NewB2BManager} className={video} controls />
        </div>
      </Container>
      <Row>
        <div className={horizantalDivider} />
        <div className={buttonsContainer}>
          <Button
            handleClick={() => {
              !isInvited
                ? dispatch(completeOnboardingAction())
                : dispatch(createUserAndCompleteOnboarding())
            }}
            label={Text.save}
          />
        </div>
      </Row>
    </>
  )
}
