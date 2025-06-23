import { onboardingBackground } from 'assets/index'
export default {
  '@global': {
    '*': {
      margin: 0,
      padding: 0
    }
  },
  body: {
    height: '100vh',
    backgroundImage: `url(${onboardingBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto',
    backgroundPosition: 'right top, right top',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}
