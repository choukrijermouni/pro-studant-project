import {
  neutral,
  blue
} from '@pro_boa/ui'

export default {
  quantity: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10
  },
  checkBox: {
    width: '100% !important'
  },
  checkBoxContainer: {
    marginTop: 24,
    marginBottom: 12
  },
  icon: {
    fontSize: 16,
    color: blue[0],
    cursor: 'pointer',
    lineHeight: 0
  },
  licenseTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    userSelect: 'none'
  },
  newHelpMessage: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  },
  helpIcon: {
    marginRight: 11,
    fontSize: 24,
    color: neutral[3]
  },
  subscriptionTypes: {
    display: 'flex',
    gap: 10
  },
  quantityButtonsStyle: {
    overflow: 'unset !important'
  },
  slidIn: {
    '& > div': {
      width: '100%'
    },
    transition: 'max-height 0.2s ease-in',
    maxHeight: 400
  }
}
