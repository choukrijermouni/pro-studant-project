import { neutral, green, blue } from '@pro_boa/ui'
export default {
  root: {
    margin: 'unset !important',
    padding: '0px !important',
    maxWidth: 'unset !important'
  },
  help: {
    width: 26,
    height: 26,
    borderRadius: '50%',
    backgroundColor: neutral[1],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    cursor: 'pointer'
  },
  containerClass: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 77,
    width: '100%'
  },
  textClass: {
    display: 'flex',
    width: '100%'
  },
  buttonClass: {
    height: 45,
    padding: '0 14px',
    whiteSpace: 'nowrap',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${blue[0]}2D`,
    cursor: 'pointer',
    '&:hover > $icon': {
      transform: 'translateY(-3px)'
    },
    '&:hover': {
      backgroundColor: `${blue[1]}2D`
    }
  },
  bigContainerClass: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  dot: {
    height: 16,
    width: 16,
    backgroundColor: green[2],
    borderRadius: '50%',
    border: `2px solid ${neutral[0]}`,
    position: 'relative',
    left: 80,
    zIndex: 1,
    bottom: 10,
    marginTop: '-26px'
  },
  icon: {
    fontSize: 16,
    color: blue[1],
    transition: 'transform 0.2s ease'
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: '-15px'
  },
  userContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 15
  }
}
