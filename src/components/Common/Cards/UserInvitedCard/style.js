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
  avatarContainer: {
    transition: 'transform 0.2s ease'
  }
}
