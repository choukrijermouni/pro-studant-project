import {
  neutral,
  blue,
  red
} from '@pro_boa/ui'

export default {
  modal: {
    width: 837,
    backgroundColor: neutral[0],
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  controlStyle: {
    width: '100%'
  },
  textStyle: {
    display: 'flex',
    alignItems: 'center'
  },
  invitesBox: {
    height: 72,
    width: 548,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center ',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: neutral[0],
    boxShadow: '0 0 36px 0 rgba(194,212,230,0.23)'
  },
  invites: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center ',
    alignItems: 'center'
  },
  icon: {
    fontSize: 24,
    color: blue[1]
  },
  editIcon: {
    fontSize: 15,
    color: neutral[3],
    padding: '11px 12px',
    border: `1px solid ${neutral[3]}`,
    borderRadius: '50%',
    marginLeft: 14
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
  circle: {
    borderRadius: '50%',
    width: 15,
    height: 15,
    padding: 2,
    background: red[2],
    color: neutral[0],
    textAlign: 'center',
    font: '13px Arial, sans-serif',
    left: -10,
    top: -3,
    position: 'relative'
  }
}
