import { neutral } from '@pro_boa/ui'

export default {
  modal: {
    width: 837,
    backgroundColor: neutral[0],
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 30px 20px 30px'
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  controlStyle: {
    width: '100%'
  },
  licenseButtons: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  line: {
    backgroundColor: neutral[13],
    height: 1,
    border: 'none',
    marginBottom: 20,
    marginTop: 45
  },
  image: {
    maxWidth: 156
  }
}
