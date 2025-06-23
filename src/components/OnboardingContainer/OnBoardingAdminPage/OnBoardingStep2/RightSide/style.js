import {
  neutral
} from '@pro_boa/ui'

export default {
  rootClass: {
    maxWidth: 549,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100% !important',
    paddingRight: '0px !important'
  },
  horizantalDivider: {
    width: '100%',
    height: 1,
    borderTop: `1px ${neutral[1]} solid`,
    marginBottom: 16
  },
  passwordStyle: {
    marginBottom: 16
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'end',
    width: '100%'
  },
  formStyle: {
    maxHeight: 142
  }
}
