import {
  neutral,
  blue
} from '@pro_boa/ui'

export default {
  header: {
    display: 'flex',
    alignItems: 'center'
  },
  actionContainer: {
    marginTop: 24
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px 0 0 4px',
    backgroundColor: neutral[0],
    marginLeft: 20,
    boxShadow: `0 0 36px 0 ${neutral[1]}`,
    paddingLeft: 16
  },
  cursor: {
    cursor: 'pointer'
  },
  teamIcon: {
    width: 30
  },
  icon: {
    display: 'flex',
    fontSize: 15,
    backgroundColor: blue[0],
    padding: 13,
    color: neutral[0],
    borderRadius: '0 4px 4px 0',
    boxShadow: `0 0 36px 0 ${neutral[1]}`
  }
}
