import { neutral, blue } from '@pro_boa/ui'
import { onboardingBackground } from 'assets'
export default {
  containerStyle: {
    backgroundImage: `url(${onboardingBackground})`,
    backgroundPosition: 'right top, right top',
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundSize: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: ({ scale }) => scale > 1 ? 10 : 0
  },
  containerPaperStyle: {
    margin: 'auto',
    width: ({ scale }) => scale > 1 ? '100%' : '65%',
    height: ({ scale }) => scale > 1 ? 'calc(100vh - 20px)' : '80%',
    overflow: 'hidden'
  },
  bluePartStyle: {
    width: '40%',
    padding: ({ scale }) => scale > 1 ? 12 : '62px 48px',
    backgroundColor: blue[0],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  whitePartStyle: {
    width: '60%',
    padding: ({ scale }) => scale > 1 ? 12 : '62px 48px',
    backgroundColor: neutral[0],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  '@media ( max-height: 800px )': {
    containerPaperStyle: {
      width: '100% !important',
      height: 'unset !important',
      minHeight: '100%'
    },
    bluePartStyle: {
      padding: '20px 30px !important'
    },
    whitePartStyle: {
      padding: '20px 30px !important'
    }
  }
}
