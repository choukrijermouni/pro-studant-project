import { blue, neutral } from '@pro_boa/ui'
export default {
  learnersBox: {
    display: 'flex',
    gap: 40
  },
  learnersInfo: {
    flexBasis: '100%',
    padding: 24,
    borderRadius: 4,
    border: `1px solid ${neutral[1]}`
  },
  getLicence: {
    display: 'flex',
    gap: 20
  },
  learners: {
    display: 'flex',
    alignItems: 'center'
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 40
  },
  cardStyle: {
    height: 45,
    padding: '0 14px',
    whiteSpace: 'nowrap',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${blue[0]}2D`,
    cursor: 'pointer',
    '&:hover > $icon': {
      transform: 'translateY(-3px)'
    },
    '&:hover': {
      backgroundColor: `${blue[1]}2D`
    }
  },
  leftSettings: {
    display: 'flex',
    gap: 30,
    marginLeft: 24
  },
  rightSettings: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  download: {
    width: 222
  },
  plus: {
    width: 105,
    marginLeft: 16,
    marginRight: 30
  },
  search: {
    width: 200
  },
  selectList: {
    width: 100
  },
  icon: {
    fontSize: 16,
    color: blue[1],
    transition: 'transform 0.2s ease'
  },
  arrow: {
    fontSize: 16,
    color: blue[1],
    fontWeight: 200,
    marginLeft: 25
  },
  licenseButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 24,
    minWidth: 170,
    cursor: 'pointer',
    height: 45,
    borderRadius: 4,
    backgroundColor: neutral[1]
  },
  checkBox: {
    width: '120px !important'
  },
  filterStyle: {
    width: '20%',
    minWidth: 85
  },
  secondPart: {
    width: (loading) => loading ? '44%' : '48%',
    columnGap: 11,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  searchBar: {
    width: 300
  },
  selectItem: {
    width: '20%',
    minWidth: 85
  },
  firstPart: {
    width: '48%',
    display: 'flex',
    alignItems: 'center'
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '48px 0 8px',
    minWidth: 900
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
  showMoreContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 50
  },
  button: {
    height: '45px !important'
  },
  teamTag: {
    width: 28,
    height: 28,
    borderRadius: '50%'
  },
  fontStyle: {
    width: 210
  },
  teamNameClass: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  nameContainer: {
    width: '15vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  popOverContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '5px 0',
    alignItems: 'flex-start'
  },
  linkTextStyle: {
    cursor: 'pointer',
    '&:hover': {
      color: blue[0]
    }
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: blue[0]
  },
  dotsPopoverContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: 40,
    gap: 3,
    cursor: 'pointer',
    height: 30
  },
  disabledLinkTextStyle: {
    '&:hover': {
      cursor: 'default'
    }
  },
  cellContainer: {
    paddingRight: '40px !important'
  },
  endRowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  linkContainer: {
    padding: '5px 10px',
    width: '100%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'background 0.3s ease',
    '& > p': {
      transition: 'color 0.3s ease'
    },
    '&:hover': {
      backgroundColor: neutral[1]
    },
    '&:hover > p': {
      color: blue[0]
    }
  },
  disabledLinkContainer: {
    padding: '5px 10px',
    width: '100%',
    cursor: 'default',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}
