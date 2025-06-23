import { blue } from '@pro_boa/ui'

export default {
  cardContainer: {
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.01) translateY(-1px)'
    },
    '&:hover $avatarContainer': {
      transform: 'scale(1.15)'
    }
  },
  row: {
    marginBottom: 8,
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 50,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 10
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  nameBox: {
    width: '11vw'
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 24
  },
  icon: {
    fontSize: 16,
    color: blue[1]
  },
  avatarContainer: {
    transition: 'transform 0.2s ease'
  }
}
