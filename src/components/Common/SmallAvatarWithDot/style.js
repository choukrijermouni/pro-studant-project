import {
  neutral,
  green
} from '@pro_boa/ui'

export default {
  dot: {
    height: 12,
    width: 12,
    backgroundColor: green[2],
    borderRadius: '50%',
    border: `2px solid ${neutral[0]}`,
    position: 'relative',
    left: 45,
    zIndex: 1,
    top: 0,
    marginTop: '-26px'
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
}
