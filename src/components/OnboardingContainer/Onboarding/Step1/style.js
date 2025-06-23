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
  },
  view: {
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: 35
  },
  cardDeck: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 16,
    margin: '16px 0 34px'
  }
}
