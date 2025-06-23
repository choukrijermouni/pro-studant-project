import { neutral, green, blue } from '@pro_boa/ui'
export default {
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
  conainerClass: {
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
    width: 120,
    height: 45,
    backgroundColor: neutral[1],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    cursor: 'pointer'
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
    color: blue[0]
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
