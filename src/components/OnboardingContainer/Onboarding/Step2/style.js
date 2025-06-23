import { neutral } from '@pro_boa/ui'
import { headerBackground } from 'assets/index'

export default {
  content: {
    display: 'block',
    padding: '65px 48px'
  },
  logo: {
    height: 38
  },
  line: {
    backgroundColor: neutral[13],
    height: 1,
    border: 'none',
    marginBottom: 20
  },
  licenseButtons: {
    display: 'flex',
    justifyContent: 'end'
  },
  video: {
    width: 800,
    height: 450,
    border: '1px solid #EDEFF9',
    borderRadius: 4,
    boxShadow: '0 0 36px 0 rgba(194,212,230,0.23)',
    marginBottom: 26
  },
  body: {
    backgroundImage: `url(${headerBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right top, right top',
    backgroundSize: 270,
    backgroundColor: neutral[0],
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column'
  }
}
