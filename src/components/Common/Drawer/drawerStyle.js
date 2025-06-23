import { createUseStyles } from 'react-jss'
import { blue } from '@pro_boa/ui'

export const style = createUseStyles({
  drawer: {
    position: 'fixed',
    top: '50%',
    transform: 'translateY(-50%)',
    right: '-100%',
    height: '95%',
    width: ({ width }) => width || 384,
    backgroundColor: 'white',
    boxShadow: '-2px 0 1px #F0F5F9',
    padding: 36,
    zIndex: 1005,
    transition: 'right 0.3s ease-in-out',
    borderRadius: 8,
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  drawerOpen: {
    right: 36
  },
  header: {
    position: 'relative',
    marginBottom: 81,
    display: 'flex',
    justifyContent: ({ helpLink }) => helpLink ? 'space-between' : 'flex-end',
    alignItems: 'center'
  },
  closeIcon: {
    cursor: 'pointer',
    color: blue[0],
    fontSize: 12
  },
  infoIcon: {
    cursor: 'pointer',
    borderRadius: '50%',
    backgroundColor: '#F1F3F4',
    height: 26,
    width: 26,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pageBackground: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1004,
    transition: 'background-color 0.3s ease-in-out'
  },
  messageContainer: {
    display: 'flex'
  },
  linkClass: {
    textDecoration: 'none'
  }
})
