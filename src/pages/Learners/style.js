import { blue, neutral, Spacing } from '@pro_boa/ui'
export default {
  learnersBox: {
    display: 'flex',
    gap: 40
  },
  learnersInfo: {
    flexBasis: '100%',
    padding: 24,
    borderRadius: 4,
    border: `1px solid ${neutral[1]}`,
    minWidth: 400
  },
  getLicence: {
    display: 'flex',
    gap: 20
  },
  learners: {
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    width: 200,
    marginBottom: 16
  },
  addToTeam: {
    marginLeft: 16,
    marginBottom: 30,
    borderTop: `1px solid ${neutral[3]}`
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
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 40
  },
  leftSettings: {
    display: 'flex',
    gap: 30
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
  searchStyle: {
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
  userContainer: {
    cursor: 'pointer'
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
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '48px 0 24px 0',
    minWidth: 900
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
  secondPart: {
    width: (loading) => loading ? '44%' : '48%',
    columnGap: 11,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  filterStyle: {
    width: '20%',
    minWidth: 200
  },
  checkBox: {
    width: '120px !important'
  },
  userCardWrapper: {
    marginBottom: 60
  },
  paginationFooter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  subTypeContainer: {
    height: 23,
    width: 23,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3767da2e'
  },
  button: {
    height: '45px !important',
    minWidth: 200
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
  cellContainer: {
    paddingRight: '40px !important'
  },
  endRowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  disabledLinkTextStyle: {
    '&:hover': {
      cursor: 'default'
    }
  },
  linkContainer: {
    padding: '5px 10px',
    width: '100%',
    display: 'flex',
    cursor: 'pointer',
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
    display: 'flex',
    cursor: 'default',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  tableRow: {
    width: '100%',
    display: 'inline-grid',
    gridTemplateColumns: 'repeat(2, 1fr) !important',
    '& td': {
      width: '100%',
      padding: () => Spacing(5, 0, 5, 5)
    }
  },
  dotsInvitedPopoverContainer: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    paddingRight: 18,
    gap: 3,
    cursor: 'pointer',
    height: 30
  }
}
