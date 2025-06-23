import {
  neutral,
  blue
} from '@pro_boa/ui'
export default {
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    margin: '16px 0'
  },
  iconHeader: {
    fontSize: 22,
    float: 'right',
    marginRight: 12,
    marginTop: 24,
    marginBottom: 24,
    color: neutral[4],
    cursor: 'pointer'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 40px'
  },
  notificationStyle: {
    boxSizing: 'border-box',
    height: 21,
    width: 21,
    border: '1px solid #F8F8F8',
    borderRadius: 10,
    backgroundColor: 'rgba(233,27,75,0.99)',
    boxShadow: '0 9px 14px -10px rgb(0 0 0 / 50%)',
    position: 'absolute',
    top: 25.5,
    right: 293
  },
  alert: {
    height: 13,
    width: 20,
    color: '#FFFFFF',
    fontFamily: 'Muli',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.23,
    lineHeight: 2,
    textAlign: 'center'
  },
  empty: {
    display: 'none'
  },
  notificationPaper: {
    width: 449,
    height: 603,
    backgroundColor: neutral[0],
    position: 'relative',
    top: 24,
    right: 250,
    display: 'flex',
    flexDirection: 'column'
  },
  notificationCardsContainer: {
    width: ' 100%',
    height: 'calc(100% - 124px)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: 5
    },
    '&::-webkit-scrollbar-thumb': {
      background: blue[1],
      borderRadius: 50
    }
  },
  notificationContainer: {
    width: 20,
    height: 20
  },
  notificationHeader: {
    height: 78,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 12
  },
  notificationCard: {
    height: 95,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottom: `.3px ${neutral[2]} solid`,
    padding: 12
  },
  notificationFooter: {
    height: 47,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    backgroundColor: neutral[0],
    bottom: 0,
    padding: 12,
    borderTop: `.3px ${neutral[2]} solid`
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%'
  },
  icon: {
    color: blue[0],
    fontWeight: 200
  },
  textContainer: {
    marginLeft: 16
  },
  triangle: {
    position: 'relative',
    top: '-17px',
    left: 213
  },
  avatarPopoverContainer: {
    display: 'flex',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  profileInfoContainer: {
    marginLeft: 8
  },
  devider: {
    width: '90%',
    height: 1,
    backgroundColor: neutral[2]
  },
  deviderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  bigDeviderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  linkContainer: {
    padding: 16,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'background 0.3s ease',
    '& > p': {
      transition: 'color 0.3s ease',
      color: neutral[5]
    },
    '&:hover': {
      backgroundColor: neutral[1]
    },
    '&:hover > p': {
      color: neutral[6]
    }
  },
  iconStyle: {
    height: 12,
    width: 12,
    color: blue[0],
    lineHeight: 0,
    marginLeft: 8
  },
  contactContainer: {
    cursor: 'pointer',
    width: '100%',
    padding: 16,
    display: 'flex',
    color: neutral[5],
    alignItems: 'center',
    justifyContent: 'flex-start',
    transition: 'background 0.3s ease',
    '&:hover': {
      color: neutral[6],
      backgroundColor: neutral[1]
    }
  },
  contactIconStyle: {
    fontSize: 18,
    color: blue[0],
    lineHeight: 0,
    marginRight: 8
  },
  linkTextStyle: {
    transition: 'background 0.3s ease, color 0.3s ease',
    '&:hover': {
      backgroundColor: neutral[1]
    }
  },
  linkStyle: {
    textDecoration: 'none'
  }
}
