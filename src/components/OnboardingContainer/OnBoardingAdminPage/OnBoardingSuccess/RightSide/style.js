import {
  neutral
} from '@pro_boa/ui'

export default {
  image: {
    width: 400
  },
  horizantalDivider: {
    width: '100%',
    height: 1,
    borderTop: `1px ${neutral[1]} solid`,
    marginBottom: 16
  },
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column'
  },
  rootClass: {
    maxWidth: 549,
    display: 'flex',
    height: '100% !important'
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
  },
  video: {
    width: '100%',
    height: 450,
    border: '1px solid #EDEFF9',
    borderRadius: 4,
    boxShadow: '0 0 36px 0 rgba(194,212,230,0.23)',
    marginBottom: 26
  }
}
