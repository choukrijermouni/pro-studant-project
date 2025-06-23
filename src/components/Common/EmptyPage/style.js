import {
  neutral,
  blue
} from '@pro_boa/ui'

export default {
  container: {
    backgroundColor: neutral[14],
    opacity: ({ hide }) => hide ? 1 : '4%',
    height: '100%',
    width: '100%',
    overflow: 'hidden'
  },
  messageContainer: {
    display: ({ hide }) => hide ? 'none' : 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 0px'
  },
  button: {
    position: 'relative',
    top: '1rem',
    display: ({ manager }) => manager ? 'none' : 'block'
  },
  contact: {
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 0 10px 0 rgba(194, 212, 230, 0.23)',
    height: 81,
    width: 270,
    marginRight: 16
  },
  icon: {
    fontSize: 25,
    color: blue[1],
    marginLeft: 24
  },
  contactCard: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 16
  }
}
