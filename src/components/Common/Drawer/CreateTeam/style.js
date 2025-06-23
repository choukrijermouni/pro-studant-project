import {
  blue,
  neutral
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
  icon: {
    fontSize: 16,
    color: blue[0]
  },
  flex: {
    display: 'flex',
    paddingRight: 16
  },
  textArea: {
    padding: '15px 15px 0 !important',
    resize: 'none',
    marginBottom: 24,
    height: 97
  },
  avatars: {
    display: 'flex',
    marginBottom: 10,
    transition: 'opacity 0.2s ease-in'
  },
  editIcon: {
    fontSize: 15,
    color: neutral[3],
    padding: '11px 12px',
    border: `1px solid ${neutral[3]}`,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45,
    cursor: 'pointer'
  },
  container: {
    width: '100%'
  },
  row: {
    width: '100%'
  },
  overlay: {
    backgroundColor: 'white',
    width: 45,
    height: 45,
    position: 'absolute',
    borderRadius: '50%',
    opacity: '60%',
    cursor: 'pointer',
    '&:hover': {
      opacity: '0%'
    }
  },
  disabled: {
    opacity: 0,
    cursor: 'pointer'
  },
  iconHelp: {
    marginLeft: 4
  },
  linkHelp: {
    lineHeight: 0
  },
  titleClass: {
    alignItems: 'center'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  slidIn: {
    transition: 'max-height 0.2s ease-in',
    maxHeight: 600
  },
  slidOut: {
    maxHeight: 0,
    display: 'none',
    transition: 'max-height 0.2s ease-in',
    '& $avatars': {
      opacity: 0
    },
    overflow: 'hidden'
  },
  textarea: {
    padding: '15px 15px 0 !important',
    resize: 'none',
    marginBottom: 10,
    width: 312
  }
}
