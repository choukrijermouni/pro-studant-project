import {
  neutral,
  blue
} from '@pro_boa/ui'
export default {
  notificationCard: {
    backgroundColor: ({ unseen }) => unseen ? '#F6FCFF' : neutral[0],
    height: 95,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottom: `.3px ${neutral[2]} solid`,
    padding: 12
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'flex-start',
    width: '90%'
  },
  icon: {
    color: blue[0],
    fontWeight: 200
  },
  textContainer: {
    marginLeft: 16
  }
}
