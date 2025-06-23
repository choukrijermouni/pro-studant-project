import { blue } from '@pro_boa/ui'
export default {
  row: {
    margin: '16px 0',
    display: 'flex',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    alignItems: 'center',
    padding: 24,
    cursor: 'pointer',
    width: '100%'
  },
  checkBox: {
    width: '0px !important'
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '10vw'
  },
  licenseCard: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 24,
    width: ({ invited, scale }) => invited ? scale > 1 ? '22vw' : '23vw' : null
  },
  icon: {
    fontSize: 16,
    color: blue[1]
  },
  flex: {
    height: 120,
    display: 'flex',
    width: '100%',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.01) translateY(-2px)'
    },
    '&:hover $avatarContainer': {
      transform: 'scale(1.15)'
    }
  },
  avatarContainer: {
    transition: 'transform 0.2s ease'
  },
  nameContainer: {
    width: ({ invited, loading }) => (invited && !loading) ? '40vw' : '16vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 25
  },
  skeletonContainer: {
    width: 170
  }
}
