import {
  blue,
  neutral
} from '@pro_boa/ui'
import { drawerWidth, drawerWidthClosed } from 'constants/'

export default {
  icon: {
    fontSize: 16,
    color: blue[0],
    marginRight: 15
  },
  size: {
    height: 38,
    width: 131,
    marginLeft: 24,
    float: 'left',
    cursor: 'pointer',
    transition: '0.3s'
  },
  side: {
    position: 'sticky',
    height: '111vh',
    minWidth: ({ open, scale }) => open ? scale > 1 ? drawerWidth - 90 : drawerWidth : drawerWidthClosed,
    top: 0,
    left: 0,
    overflowX: 'Hidden',
    paddingTop: '60px ',
    transition: '0.5s ',
    backgroundColor: neutral[1],
    zIndex: '1000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
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
    fontSize: 18,
    float: 'right',
    marginRight: 10,
    color: blue[0],
    cursor: 'pointer'
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
    width: 38
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 86
  },
  kids: {
    width: ({ open, scale }) => open ? scale > 1 ? drawerWidth - 90 : drawerWidth : drawerWidthClosed,
    position: 'fixed',
    transition: '0.5s '
  },
  bottom: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 24,
    cursor: 'pointer',
    position: 'fixed',
    bottom: 0,
    width: ({ open }) => open ? 100 : 10,
    transition: '0.3s '
  },
  paramsText: {
    display: ({ open }) => open ? 'inline' : 'none',
    whiteSpace: 'nowrap'
  }
}
