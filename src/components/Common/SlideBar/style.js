import { neutral, Typography, blue } from '@pro_boa/ui'

export default {
  overlay: {
    position: 'fixed',
    width: '100vw',
    height: '100%',
    background: 'rgba(0,0,0,.77)',
    top: 0,
    left: 0,
    zIndex: '99999',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  modalWrapper: {
    cursor: 'default',
    display: 'flex',
    justifyContent: ({ justify }) => justify || 'flex-end',
    margin: '24px',
    minHeight: 'calc(100% - 48px)'
  },
  modalInner: {
    margin: ({ margin }) => margin || 0,
    borderRadius: 6,
    textAlign: 'center',
    boxShadow: '0 26px 26px 0 rgba(10, 31, 68, 0.12), 0 0 1px 0 rgba(10, 31, 68, 0.1)',
    padding: '25px',
    position: 'relative',
    background: neutral[0],
    animation: ({ modalAnimation }) => modalAnimation ? '$slideInFromRight 0.2s ease-in-out' : '$slideOutToLeft 0.2s ease-in-out',
    '& .icon': {
      display: 'inline-block',
      marginBottom: 21
    }
  },
  titleStyle: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.mediumTitle,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.4,
    letterSpacing: '0.5px',
    margin: [0, 0, 10, 0]
  },
  cross: {
    cursor: 'pointer',
    fontSize: 16,
    color: blue[0]
  },
  messageContainer: {
    display: 'flex'
  },
  linkClass: {
    textDecoration: 'none'
  },
  topStyle: {
    width: '100%',
    display: 'flex',
    justifyContent: ({ helplink }) => helplink ? 'space-between' : 'flex-end',
    alignItems: 'center',
    marginBottom: 73
  },
  '@keyframes slideInFromRight': {
    from: {
      transform: 'translateX(100%)',
      opacity: 0
    },
    to: {
      transform: 'translateX(0)',
      opacity: 1
    }
  },
  '@keyframes slideOutToLeft': {
    from: {
      transform: 'translateX(0)',
      opacity: 1
    },
    to: {
      transform: 'translateX(100%)',
      opacity: 0
    }
  }
}
