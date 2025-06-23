import {
  neutral,
  blue
} from '@pro_boa/ui'

export default {
  modal: {
    backgroundColor: neutral[0],
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    paddingLeft: 20,
    paddingRight: 20
  },
  licenseButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 50
  },
  line: {
    backgroundColor: neutral[13],
    height: 1,
    border: 'none',
    marginBottom: 20,
    marginTop: 40,
    width: '100%'
  },
  emailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  alignAvatar: {
    display: 'flex',
    alignItems: 'center'
  },
  emailsBox: {
    height: 380,
    paddingRight: 12,
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      width: 5
    },
    '&::-webkit-scrollbar-thumb': {
      background: blue[1],
      borderRadius: 50
    },
    overflowX: 'hidden'
  }
}
