import {
  blue,
  neutral
} from '@pro_boa/ui'

export default {
  root: {
    userSelect: 'none',
    maxWidth: 380,
    minWidth: 300
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginBottom: 20
  },
  quantity: {
    marginBottom: 16,
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10
  },
  quantityButtonsStyle: {
    overflow: 'unset !important'
  },
  licenseTypeContainer: {
    width: '100%',
    marginTop: 16
  },
  spanStyle: {
    color: blue[0],
    textDecoration: 'none'
  },
  IntercomSpanStyle: {
    color: blue[0],
    textDecoration: 'none',
    cursor: 'pointer'
  },
  messageContainer: {
    display: 'flex',
    textDecoration: 'none',
    padding: 16,
    alignItems: 'center'
  },
  tipStyle: {
    display: 'flex',
    flexDirection: 'column',
    left: 0,
    bottom: '1vh',
    padding: 10,
    border: '1px solid #FFF9EB',
    borderRadius: 4
  },
  helpIconClass: {
    width: 28,
    height: 28,
    backgroundColor: '#FFF9E9',
    padding: '0 8px',
    borderRadius: 4,
    cursor: 'pointer'
  },
  paperStyle: {
    display: 'flex',
    width: 'auto',
    color: blue[0],
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 4,
    border: '1px solid #A9BDEB',
    padding: 16,
    margin: '13px 0'
  },
  typeStyle: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  boxStyle: {
    height: 42,
    width: '100%',
    color: neutral[6],
    fontwieght: 700,
    border: '1px solid #A9BDEB',
    backgroundColor: neutral[0],
    borderRadius: 4,
    fontSize: 16,
    textAlign: 'center',
    cursor: 'pointer'
  },
  valuestyle: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8
  }
}
