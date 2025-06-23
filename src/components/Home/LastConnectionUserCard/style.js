import { blue } from '@pro_boa/ui'

export default {
  cardContainer: {
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.01) translateY(-1px)'
    },
    '&:hover $avatarContainer': {
      transform: 'scale(1.15)'
    }
  },
  row: {
    cursor: ({ manager }) => manager ? 'default !important' : 'pointer',
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
    minWidth: 'calc(100% - 160px)'
  },
  nameBox: {
    width: '11vw'
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 24,
    width: 156
  },
  icon: {
    fontSize: 16,
    color: blue[1]
  },
  avatarContainer: {
    transition: 'transform 0.2s ease'
  }
}
