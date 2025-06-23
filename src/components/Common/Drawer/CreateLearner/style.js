import {
  blue,
  neutral
} from '@pro_boa/ui'

export default {
  root: {
    userSelect: 'none',
    maxWidth: 300,
    minWidth: 300
  },
  icon: {
    fontSize: 16,
    color: blue[0]
  },
  row: {
    width: '100%',
    margin: '12px 0 20px 0'
  },
  iconHelp: {
    marginLeft: 4
  },
  linkHelp: {
    lineHeight: 0
  },
  titleClass: {
    alignItems: 'center'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  slidIn: {
    transition: 'max-height 0.2s ease-in',
    maxHeight: 600
  },
  slidOut: {
    maxHeight: 0,
    display: 'none',
    transition: 'max-height 0.2s ease-in',
    '& $avatars': {
      opacity: 0
    },
    overflow: 'hidden'
  },
  checkBox: {
    width: '100% !important'
  },
  checkBoxContainer: {
    marginBottom: 24
  },
  messageContainer: {
    display: 'flex',
    textDecoration: 'none',
    padding: 16,
    alignItems: 'center'
  },
  helpIconClass: {
    width: 28,
    height: 28,
    backgroundColor: '#FFF9E9',
    padding: '0 8px',
    borderRadius: 4,
    cursor: 'pointer'
  },
  quantity: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10
  },
  quantityButtonsStyle: {
    overflow: 'unset !important'
  },
  tipStyle: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 30,
    border: '1px solid #FFF9EB',
    borderRadius: 4
  },
  spanStyle: {
    color: blue[0],
    textDecoration: 'none'
  },
  quantityRow: {
    width: '100%',
    margin: '12px 0 20px 0',
    flexDirection: 'column'
  },
  IntercomSpanStyle: {
    color: blue[0],
    textDecoration: 'none',
    cursor: 'pointer'
  },
  licenseSelectContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: 8
  },
  paperStyle: {
    display: 'flex',
    width: 300,
    color: blue[0],
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 4,
    border: '1px solid #A9BDEB',
    padding: 10,
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
