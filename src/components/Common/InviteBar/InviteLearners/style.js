import {
  blue
} from '@pro_boa/ui'

export default {
  header: {
    alignItems: 'center',
    marginBottom: 24,
    '&:hover p': {
      color: `${blue[0]} !important`
    },
    userSelect: 'none'
  },
  invites: {
    minHeight: 140,
    maxHeight: 140,
    width: '100%',
    resize: 'none'
  },
  icon: {
    fontSize: 16,
    color: blue[0],
    lineHeight: 0,
    cursor: 'pointer'
  },
  root: {
  },
  messageContainer: {
    display: 'flex',
    textDecoration: 'none'
  },
  pointer: {
    cursor: 'pointer'
  },
  core: {
    '& > div': {
      width: '100%'
    }
  },
  helpIconClass: {
    width: 26,
    cursor: 'pointer'
  },
  slidIn: {
    '& > div': {
      width: '100%'
    },
    transition: 'max-height 0.2s ease-in',
    maxHeight: 400
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
