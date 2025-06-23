import {
  neutral,
  blue,
  red
} from '@pro_boa/ui'

export default {
  modal: {
    width: 580,
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
  avatars: {
    display: 'flex'
  },
  userImage: {
    marginLeft: -18
  },
  input: {
    width: 200
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  invitesBox: {
    height: 72,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center ',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: neutral[0],
    boxShadow: '0 0 36px 0 rgba(194,212,230,0.23)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.03)'
    }
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
    padding: '13px 12px',
    border: `1px solid ${neutral[3]}`,
    borderRadius: '50%',
    marginLeft: 14,
    cursor: 'pointer',
    '&:hover': {
      color: blue[1],
      border: `1px solid ${blue[1]}`
    }
  },
  licenseButtons: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  line: {
    backgroundColor: neutral[13],
    height: 1,
    border: 'none',
    marginBottom: 20
  },
  circle: {
    borderRadius: '50%',
    width: 17,
    height: 17,
    padding: 2,
    background: red[2],
    color: neutral[0],
    textAlign: 'center',
    font: '12px Arial, sans-serif',
    left: -10,
    top: -3,
    position: 'relative'
  },
  noLicenseMessageContainer: {
    width: '70%',
    marginRight: 25
  },
  image: {
    maxWidth: 156
  }
}
