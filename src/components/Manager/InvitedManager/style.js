import {
  neutral,
  blue
} from '@pro_boa/ui'

export default {
  header: {
    display: 'flex',
    flexDirection: 'row'
  },
  actionContainer: {
    marginTop: 24
  },
  rightContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginLeft: 25
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px 0 0 4px',
    backgroundColor: neutral[0],
    marginLeft: 0,
    marginRight: -4,
    boxShadow: `0 0 36px 0 ${neutral[1]}`,
    cursor: 'pointer'
  },
  icon: {
    display: 'flex',
    fontSize: 15,
    backgroundColor: blue[0],
    padding: 15,
    color: neutral[0],
    borderRadius: '0 4px 4px 0',
    boxShadow: `0 0 36px 0 ${neutral[1]}`
  },
  teamIcon: {
    width: 30
  }
}
