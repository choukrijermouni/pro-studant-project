import Onboarding from 'components/OnboardingContainer/Onboarding'
import { createUseStyles } from 'react-jss'
import styles from './style'
const useStyle = createUseStyles(styles)

export default () => {
  const { body } = useStyle()
  return (
    <div className={body}>
      <Onboarding />
    </div>
  )
}
