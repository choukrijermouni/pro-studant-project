import { blue } from '@pro_boa/ui'
export default {
  row: {
    margin: '8px 0',
    display: 'flex',
    justifyContent: 'flex-start',
    height: 80,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 22,
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.01) translateY(-1px)'
    },
    '&:hover $avatarContainer': {
      transform: 'scale(1.15)'
    }
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 24,
    width: 170
  },
  icon: {
    fontSize: 16,
    color: blue[1]
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  fontStyle: {
    width: 210
  },
  avatarContainer: {
    transition: 'transform 0.2s ease'
  }
}
