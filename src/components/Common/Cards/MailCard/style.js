import { blue } from '@pro_boa/ui'
export default {
  row: {
    margin: ({ margin }) => margin || 16,
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 50,
    overflow: 'hidden',
    alignItems: 'center',
    padding: ({ padding }) => padding || 24,
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
    justifyContent: 'flex-start',
    width: '9vw'
  },
  emailCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  icon: {
    fontSize: 16,
    color: blue[1]
  },
  fontStyle: {
    width: '18vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 25
  },
  flex: {
    display: 'flex',
    flex: 1
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 0.2s ease'
  }
}
