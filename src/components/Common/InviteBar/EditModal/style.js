import { neutral } from '@pro_boa/ui'

export default {
  modal: {
    marginBottom: 48,
    maxWidth: 380
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  body: {
    width: '100%'
  },
  avatars: {
    display: 'flex',
    marginBottom: 10,
    transition: 'opacity 0.2s ease-in',
    justifyContent: 'space-between',
    width: '54%'
  },
  titleClass: {
    alignItems: 'center'
  },
  container: {
    width: '100%'
  },
  invitesBox: {
    height: 72,
    width: 548,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  editIcon: {
    fontSize: 15,
    color: neutral[3],
    padding: '11px 12px',
    border: `1px solid ${neutral[3]}`,
    borderRadius: '50%',
    marginLeft: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45,
    cursor: 'pointer'
  },
  input: {
    resize: 'none'
  },
  textArea: {
    padding: '15px 15px 0 !important',
    resize: 'none',
    marginBottom: 24,
    height: 97
  },
  teamTag: {
    backgroundColor: 'white',
    width: 45,
    height: 45,
    position: 'absolute',
    borderRadius: '50%',
    opacity: '60%'
  },
  activeTeamTag: {
    opacity: 0
  },
  flex: {
    display: 'flex'
  },
  linkHelp: {
    lineHeight: 0,
    marginTop: 10
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
  }
}
