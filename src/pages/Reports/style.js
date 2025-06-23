import { blue } from '@pro_boa/ui'
export default {
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
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  ctaStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 600,
    gap: 10
  },
  actionContainer: {
    display: 'flex'
  },
  cardStyle: {
    height: 50,
    padding: '0 18px',
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
  calendarIconClass: {
    fontSize: 18,
    color: blue[0],
    lineHeight: 0,
    marginLeft: 8
  },
  icon: {
    fontSize: 16,
    color: blue[1],
    transition: 'transform 0.2s ease'
  },
  paperDate: {
    height: 50,
    padding: 12,
    alignItems: 'center',
    border: '1px solid #F0F5F9',
    cursor: 'pointer'
  },
  ctaContainer: {
    display: 'flex'
  }
}
