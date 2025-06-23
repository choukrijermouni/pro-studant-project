import {
  blue,
  neutral,
  red
} from '@pro_boa/ui'

export default {
  paperStyle: {
    padding: 16,
    justifyContent: 'center',
    backgroundColor: neutral[0]
  },
  image: {
    margin: '29px 0 72px 0'
  },
  paperFormStyle: {
    padding: 16,
    justifyContent: 'center',
    flexDirection: 'column',
    margin: '8px 0 24px 0',
    backgroundColor: neutral[0]
  },
  horizantalDivider: {
    width: '100%',
    height: 1,
    borderTop: `1px ${neutral[1]} solid`,
    marginTop: 116,
    marginBottom: 16
  },
  appTextContainer: {
    flexDirection: 'column',
    display: 'flex'
  },
  subContainerClass: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 32
  },
  rootClass: {
    paddingTop: 37
  },
  flexCenterClass: {
    marginTop: 24,
    marginBottom: 19,
    display: 'flex',
    justifyContent: 'flex-start'
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
    borderColor: red[3],
    borderRadius: 4,
    marginRight: 8,
    cursor: 'pointer',
    '& :first-child': {
      color: 'red'
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
  facebookBoxClass: {
    height: 40,
    width: 40,
    border: '1px solid #1877F2',
    backgroundColor: '#1877F2',
    borderRadius: 4,
    marginRight: 8,
    cursor: 'pointer',
    '& :first-child': {
      color: neutral[0]
    }
  },
  twitterBoxClass: {
    height: 40,
    width: 40,
    border: '1px solid #1DA1F2',
    backgroundColor: '#1DA1F2',
    borderRadius: 4,
    marginRight: 8,
    cursor: 'pointer',
    '& :first-child': {
      color: neutral[0]
    }
  },
  linkedinBoxClass: {
    height: 40,
    width: 40,
    border: '1px solid #007BB5',
    backgroundColor: '#007BB5',
    borderRadius: 4,
    cursor: 'pointer',
    '& :first-child': {
      color: neutral[0]
    }
  },
  formRootClass: {
    width: '100%',
    marginTop: 15,
    marginBottom: 54
  },
  formRowClass: {
    width: '100%',
    display: 'flex',
    flexDirectin: 'row',
    justifyContent: 'space-between'
  },
  firstColClass: {
    width: 253,
    paddingRight: 22
  },
  secondColClass: {
    width: 253,
    paddingLeft: 22
  },
  textInputStyle: {
    marginTop: 8,
    '&::placeholder': {
      color: neutral[3]
    }
  },
  selectedItemContainer: {
    '& div > p': {
      marginBottom: 8
    }
  },
  inputClass: {
    display: 'none'
  },
  pointerClass: {
    cursor: 'pointer'
  },
  paperAvatarStyle: {
    display: 'flex',
    flexDirection: 'column',
    padding: 24,
    marginBottom: 16,
    width: '100%'
  },
  paperSelectList: {
    display: 'flex',
    width: '100%',
    marginBottom: 16
  },
  logout: {
    width: 'max-content'
  },
  space: {
    marginBottom: 93
  }
}
