import {
  neutral,
  blue
} from '@pro_boa/ui'

export default {
  license: {
    padding: 24,
    width: '100%'
  },
  historyContainer: {
    borderRadius: 4,
    backgroundColor: neutral[0],
    boxShadow: '0 0 36px 0 rgba(194,212,230,0.23)',
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    padding: 24
  },
  historyInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  historyIcons: {
    fontSize: 16,
    color: blue[0],
    cursor: 'pointer',
    lineHeight: 0,
    marginRight: 8
  },
  icon: {
    fontSize: 16,
    color: blue[0],
    cursor: 'pointer',
    lineHeight: 0
  },
  iconCalendar: {
    fontSize: 24,
    color: blue[0],
    padding: 12,
    backgroundColor: neutral[2],
    margin: '0 36px 0 0'
  },
  licenseTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    cursor: 'pointer',
    '&:hover > p': {
      color: blue[0]
    },
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
  slidIn: {
    '& > div': {
      width: '100%'
    },
    transition: 'max-height 0.2s ease-in',
    maxHeight: 400
  },
  slidOut: {
    '& > div': {
      width: '100%'
    },
    maxHeight: 0,
    transition: 'max-height 0.2s ease-in',
    overflow: 'hidden'
  }
}
