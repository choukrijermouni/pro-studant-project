import {
  neutral,
  blue
} from '@pro_boa/ui'
import { headerBackground } from 'assets/index'

export default {
  image: {
    height: 404,
    marginLeft: 48
  },
  logo: {
    height: 38
  },
  content: {
    display: 'block',
    padding: '65px 48px'
  },
  licenseButtons: {
    display: 'flex',
    justifyContent: 'end'
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
    flexDirection: 'column',
    minWidth: 1230
  },
  horizantalDivider: {
    width: '100%',
    height: 1,
    borderTop: `1px ${neutral[1]} solid`,
    marginTop: 138,
    marginBottom: 16
  },
  rootClass: {
    maxWidth: 549
  },
  flex: {
    display: 'flex'
  },
  contactCard: {
    display: 'flex',
    alignItems: 'center'
  },
  contact: {
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 0 10px 0 rgba(194, 212, 230, 0.23)',
    height: 81,
    width: 270,
    marginRight: 16
  },
  icon: {
    fontSize: 25,
    color: blue[1],
    marginLeft: 24
  }
}
