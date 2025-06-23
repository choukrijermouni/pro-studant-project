import { blue, neutral } from '@pro_boa/ui'
export default {
  cardStyle: {
    height: 45,
    padding: '0 14px',
    whiteSpace: 'nowrap',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${blue[0]}2D`,
    cursor: 'pointer',
    '&:hover > $icon': {
      transform: 'translateY(-3px)'
    },
    '&:hover': {
      backgroundColor: `${blue[1]}2D`
    }
  },
  icon: {
    fontSize: 16,
    color: blue[1],
    transition: 'transform 0.2s ease'
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  userCardWrapper: {
    marginBottom: 24
  },
  iconHelp: {
    marginLeft: 10,
    marginTop: 5
  },
  linkHelp: {
    lineHeight: 0
  },
  titleClass: {
    alignItems: 'center'
  },
  showMoreContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 50
  },
  paperDate: {
    backgroundColor: neutral[0],
    padding: '8px 12px',
    alignItems: 'center',
    cursor: 'pointer'
  },
  containerActions: {
    display: 'flex',
    marginBottom: 16,
    alignItems: 'center'
  },
  calendarIconClass: {
    fontSize: 18,
    color: blue[0],
    lineHeight: 0,
    marginLeft: 8
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  subTypeContainer: {
    height: 23,
    width: 23,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3767da2e'
  }
}
