import {
  blue
} from '@pro_boa/ui'

export default {
  invites: {
    minHeight: 73,
    maxHeight: 73,
    minWidth: 312,
    maxWidth: 312,
    resize: 'none'
  },
  icon: {
    fontSize: 16,
    color: blue[0]
  },
  input: {
    width: '100%',
    zIndex: 1,
    marginBottom: 20
  },
  firstInput: {
    width: '100%',
    zIndex: 2,
    marginBottom: 20
  },
  root: {
    userSelect: 'none',
    maxWidth: 300,
    minWidth: 300
  },
  messageContainer: {
    display: 'flex'
  },
  pointer: {
    cursor: 'pointer'
  },
  linkClass: {
    textDecoration: 'none'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginBottom: 20
  },
  slidIn: {
    '& > div': {
      width: '100%'
    },
    transition: 'max-height 0.2s ease-in',
    maxHeight: 200
  },
  slidOut: {
    '& > div': {
      width: '100%'
    },
    maxHeight: 0,
    transition: 'max-height 0.2s ease-in',
    overflow: 'hidden'
  }
}
