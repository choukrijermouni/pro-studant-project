import {
  blue,
  neutral
} from '@pro_boa/ui'
import { drawerWidth, drawerWidthClosed } from 'constants/'

export default {
  '@global': {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 86,
    position: 'fixed',
    transition: 'width 0.5s',
    width: ({ open, scale }) => open ? scale > 1 ? drawerWidth - 90 : drawerWidth : drawerWidthClosed,
    zIndex: 1002
  },
  logoBackground: {
    width: ({ open, scale }) => open ? scale > 1 ? drawerWidth - 90 : drawerWidth : drawerWidthClosed,
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: neutral[1],
    zIndex: 1001,
    height: 85,
    transition: '0.5s'
  },
  main: {
    transition: 'margin-left .5s',
    flexGrow: 1,
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '60%'
  },
  content: {
    paddingLeft: 38,
    paddingTop: 100,
    paddingRight: 24,
    width: '100%',
    overflowX: 'hidden',
    paddingBottom: 50
  },
  icon: {
    fontSize: 16,
    color: blue[0],
    marginRight: 15
  },
  size: {
    height: 38,
    width: ({ open }) => open ? 131 : 0,
    marginLeft: 24,
    float: 'left',
    cursor: 'pointer',
    transition: '0.3s'
  },
  side: {
    height: '100%',
    width: ({ open, scale }) => open ? scale > 1 ? drawerWidth - 90 : drawerWidth : drawerWidthClosed,
    top: 0,
    left: 0,
    overflowX: 'Hidden',
    paddingTop: '60px',
    transition: '0.5s',
    backgroundColor: neutral[1],
    position: 'fixed'
  },
  wizard: {
    backgroundColor: blue[0],
    color: neutral[0],
    width: 254,
    height: 60,
    borderRadius: 5,
    border: 0,
    boxShadow: 'none',
    cursor: 'pointer',
    display: 'inline-block',
    textAlign: 'left',
    textDecoration: 'none',
    margin: '120px 0px 26px 22px',
    transition: '0.3s'
  },
  buttonTitle: {
    display: 'block',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonSub: {
    display: 'block',
    marginTop: 5,
    fontSize: 13,
    whiteSpace: 'nowrap'
  },
  iconHeader: {
    fontSize: 22,
    float: 'right',
    marginRight: 24,
    marginTop: 7,
    color: blue[0],
    cursor: 'pointer',
    opacity: ({ open }) => open ? 0 : 1,
    transition: '0.3s'
  },
  iconHeaderClose: {
    fontSize: 22,
    float: 'right',
    marginRight: 24,
    marginTop: 7,
    color: blue[0],
    cursor: 'pointer',
    opacity: ({ open }) => open ? 1 : 0,
    transition: '0.3s',
    position: 'relative',
    top: -26
  },
  buttonIcon: {
    verticalAlign: 'middle',
    float: 'left',
    fontSize: 30,
    height: 40,
    width: 44,
    margin: '10px 15px;'
  },
  iconHolder: {
    height: 38,
    width: 38,
    '&:hover > $iconHeader': {
      opacity: ({ open }) => open ? 1 : 0
    },
    '&:hover > $iconHeaderClose': {
      opacity: ({ open }) => open ? 0 : 1
    }
  },
  root: {
    display: 'flex'
  }
}
