import {
  blue,
  neutral,
  red
} from '@pro_boa/ui'

export default {
  horizantalDivider: {
    width: '100%',
    height: 1,
    borderTop: `1px ${neutral[1]} solid`,
    marginBottom: 16
  },
  subContainerClass: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 32
  },
  avatarGroupClass: {
    marginRight: 30
  },
  socialGroupClass: {
    width: 232,
    display: 'flex',
    alignItems: 'center'
  },
  centerIconClass: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    fontSize: 18
  },
  deleteBoxClass: {
    height: 40,
    width: 40,
    border: '1px solid',
    borderColor: ({ Photo }) => Photo ? red[2] : neutral[4],
    borderRadius: 4,
    marginRight: 8,
    cursor: 'pointer',
    '& :first-child': {
      color: ({ Photo }) => Photo ? red[2] : neutral[4]
    }
  },
  editBoxClass: {
    height: 40,
    width: 40,
    border: '1px solid',
    borderColor: blue[0],
    borderRadius: 4,
    marginRight: 8,
    cursor: 'pointer',
    '& :first-child': {
      color: blue[0]
    }
  },
  formRootClass: {
    width: '100%',
    marginTop: 15
  },
  formRowClass: {
    width: '100%',
    display: 'flex',
    flexDirectin: 'row',
    justifyContent: 'space-between'
  },
  firstColClass: {
    width: '50%',
    paddingRight: 22
  },
  secondColClass: {
    width: '50%',
    paddingLeft: 22
  },
  inputClass: {
    display: 'none'
  },
  pointerClass: {
    cursor: 'pointer'
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  invitedButtonContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end'
  }
}
