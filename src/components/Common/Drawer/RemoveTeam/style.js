import {
  blue
} from '@pro_boa/ui'

export default {
  root: {
    marginBottom: 48,
    maxWidth: 380
  },
  invites: {
    minHeight: 73,
    maxHeight: 73,
    minWidth: 312,
    maxWidth: 312,
    resize: 'none'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    cursor: 'pointer',
    '&:hover p': {
      color: blue[0]
    },
    userSelect: 'none'
  },
  titleClass: {
    alignItems: 'center'
  },
  icon: {
    fontSize: 16,
    color: blue[0]
  },
  input: {
    width: '100%'
  },
  textarea: {
    padding: '15px 15px 0 !important',
    resize: 'none',
    marginBottom: 10,
    width: 312
  },
  font: {
    whiteSpace: 'nowrap'
  },
  area: {
    width: '100%'
  },
  slidIn: {
    transition: 'max-height 0.2s ease-in',
    maxHeight: 400
  },
  slidOut: {
    maxHeight: 0,
    transition: 'max-height 0.2s ease-in',
    overflow: 'hidden'
  },
  container: {
    width: '100%',
    marginBottom: 20
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 9
  }
}
