import { blue, neutral } from '@pro_boa/ui'

export default {
  root: {
    paddingLeft: 30,
    marginBottom: 48
  },
  assignRoot: {
    marginBottom: 20,
    cursor: 'pointer',
    userSelect: 'none'
  },
  invites: {
    minHeight: 73,
    maxHeight: 73,
    minWidth: 312,
    maxWidth: 312,
    resize: 'none'
  },
  icon: {
    fontSize: 16,
    color: blue[0]
  },
  input: {
    width: '100%'
  },
  area: {
    width: '100%'
  },
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    cursor: 'pointer',
    '&:hover p': {
      color: blue[0]
    },
    userSelect: 'none'
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  container: {
    width: '100%',
    marginBottom: 20
  },
  controlStyle: {
    width: '100%'
  },
  textStyle: {
    display: 'flex',
    alignItems: 'center'
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
  slidIn: {
    transition: 'max-height 0.2s ease-in',
    maxHeight: 400
  },
  slidOut: {
    maxHeight: 0,
    transition: 'max-height 0.2s ease-in',
    overflow: 'hidden'
  },
  image: {
    maxWidth: 156
  }
}
